import { useState, useEffect, useMemo, useRef } from 'react';
import { useCart } from './context/CartContext';
import { useHistory } from './context/HistoryContext';
import { CATEGORIES, MASTER_ITEMS, catalogItemMatchesSearch } from './data/catalog';
import { Plus, Search, X, Printer, ShoppingBasket, Trash2, History, BarChart3, ChevronRight, Save, RefreshCcw, Camera, Share2, Download, Upload } from 'lucide-react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

export const MarketApp = () => {
  const { lines = [], addToCart, removeFromCart, clearCart } = useCart();
  const { history, addRecord, clearHistory, setHistory } = useHistory(); // setHistory ထပ်ဖြည့်ထားပါတယ်
  const [activeTab, setActiveTab] = useState('shop');
  const [lang, setLang] = useState<'EN' | 'MM'>('MM');
  const [activeCat, setActiveCat] = useState('Vegetables');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [storeName, setStoreName] = useState(() => localStorage.getItem('market_store_name') || 'ဆိုင်အမည်');

  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const [viewMode, setViewMode] = useState<'list' | 'stats'>('list');
  const [statsPeriod, setStatsPeriod] = useState<'week' | 'month' | 'year' | 'all'>('month');
  const [selectedMonths, setSelectedMonths] = useState<number[]>([new Date().getMonth()]);

  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [qtyInputStr, setQtyInputStr] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState('ခု');
  const [manualCategoryEn, setManualCategoryEn] = useState<string>('Others');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = (en: string, mm: string) => (lang === 'EN' ? en : mm);
  const grandTotal = lines.reduce((sum: number, line: any) => sum + (line.totalPrice || 0), 0);
  const UNITS = ['ခု', 'လုံး', 'ဗူး', 'ပြည်', 'ပိဿာ', 'ကျပ်သား', 'Gram', 'Kg', 'ထုပ်', 'စည်း'];
  const MONTHS_MM = ["ဇန်", "ဖေ", "မတ်", "ဧ", "မေ", "ဇွန်", "ဇူလိုင်", "သြ", "စက်", "အောက်", "နို", "ဒီ"];

  useEffect(() => {
    localStorage.setItem('market_store_name', storeName);
    document.title = t("Ainsin Htee", "အိမ်ရှင်ထီး");
  }, [storeName, lang]);

  const validCategoryEns = useMemo(() => new Set(CATEGORIES.map((c) => c.en)), []);

  // --- Export / Import Logic ---
  const handleExport = () => {
    const data = JSON.stringify(history);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ainsin-htee-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          setHistory(importedData);
          alert("မှတ်တမ်းများ ပြန်သွင်းပြီးပါပြီ။");
        }
      } catch (err) {
        alert("ဖိုင်မှားယွင်းနေပါသည်။");
      }
    };
    reader.readAsText(file);
  };

  const visibleCatalogItems = useMemo(() => {
    const q = searchTerm.trim();
    if (q) return MASTER_ITEMS.filter((i) => catalogItemMatchesSearch(i, q));
    return MASTER_ITEMS.filter((i) => i.cat === activeCat);
  }, [searchTerm, activeCat]);

  const currentMonth = new Date().getMonth();
  const monthlyTotal = history
    .filter((r: any) => new Date(r.date).getMonth() === currentMonth)
    .reduce((sum: number, r: any) => sum + r.total, 0);

  const stats = useMemo(() => {
    const now = new Date();
    const filtered = history.filter((rec: any) => {
      const d = new Date(rec.date);
      if (statsPeriod === 'week') return (now.getTime() - d.getTime()) <= 7 * 24 * 60 * 60 * 1000;
      if (statsPeriod === 'month') return selectedMonths.includes(d.getMonth()) && d.getFullYear() === now.getFullYear();
      if (statsPeriod === 'year') return d.getFullYear() === now.getFullYear();
      return true;
    });

    const categoryMap: Record<string, number> = {};
    const itemMap: Record<string, { total: number; qty: number; unit: string }> = {};
    let periodTotalSpending = 0;

    filtered.forEach((rec: any) => {
      rec.items.forEach((it: any) => {
        const catEn = it.categoryEn || 'Others';
        const catName = t(catEn, CATEGORIES.find((c) => c.en === catEn)?.mm || catEn);
        categoryMap[catName] = (categoryMap[catName] || 0) + it.totalPrice;
        if (!itemMap[it.mmName]) { itemMap[it.mmName] = { total: 0, qty: 0, unit: it.unit }; }
        itemMap[it.mmName].total += it.totalPrice;
        itemMap[it.mmName].qty += it.quantity;
        periodTotalSpending += it.totalPrice;
      });
    });

    const sortedItems = Object.entries(itemMap).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.total - a.total);
    const sortedCategories = Object.entries(categoryMap).map(([category, total]) => ({
        category, total, percentage: periodTotalSpending > 0 ? Math.round((total / periodTotalSpending) * 100) : 0
      })).sort((a, b) => b.total - a.total);

    return { categoryData: sortedCategories, allItemData: sortedItems, periodTotal: periodTotalSpending };
  }, [history, statsPeriod, selectedMonths, lang]);

  const saveAsImage = async () => {
    const element = document.querySelector('.print-area') as HTMLElement;
    if (!element) return;
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      onclone: (_doc, cloned) => {
        cloned.querySelectorAll('[data-receipt-capture-hide]').forEach((node) => node.remove());
      },
    });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = `AinsinHtee-Receipt.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center text-slate-900 font-sans">
      <style>{`
        input { font-size: 16px !important; }
        input.market-price-field { font-size: clamp(1.75rem, 7vw, 2.75rem) !important; }
        @media print {
          body * { visibility: hidden !important; }
          .print-area, .print-area * { visibility: visible !important; }
          .print-area { position: fixed !important; left: 0 !important; top: 0 !important; width: 100% !important; background: white !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col h-screen overflow-hidden relative border-x border-slate-200">
        
        {/* HEADER */}
        <div className="bg-white p-4 flex justify-between items-center border-b no-print sticky top-0 z-40">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-orange-600 italic tracking-tighter">
              {t("Ainsin Htee", "အိမ်ရှင်ထီး")}
            </h1>
            <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Shopping Assistant</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowShareModal(true)} className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-slate-400 shadow-sm"><Share2 size={18}/></button>
            <button onClick={() => setLang(l => l === 'EN' ? 'MM' : 'EN')} className="bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200 text-lg shadow-sm">
              {lang === 'EN' ? '🇺🇸' : '🇲🇲'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
          {activeTab === 'shop' && (
            <div className="p-4 space-y-4">
              <div className="flex gap-2 no-print">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder={t("Search...", "ရှာရန်...")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-2xl outline-none font-bold" />
                </div>
                <button onClick={() => { setEditingItem({ custom: true }); setInputName(''); setInputPrice(''); setQtyInputStr('1'); setManualCategoryEn('Others'); }} className="bg-orange-600 text-white p-3 rounded-2xl shadow-lg active:scale-95"><Plus size={24} /></button>
              </div>

              {!searchTerm && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 no-print">
                  {CATEGORIES.map((cat: any) => (
                    <button key={cat.en} onClick={() => setActiveCat(cat.en)} className={`px-5 py-2 rounded-2xl font-black text-[11px] whitespace-nowrap transition-all ${activeCat === cat.en ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                      {t(cat.en, cat.mm)}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-3">
                 {visibleCatalogItems.map((i: any) => (
                    <button key={i.id} onClick={() => { setEditingItem(i); setInputPrice(''); setQtyInputStr('1'); }} className="flex flex-col items-stretch justify-between p-3 border border-slate-100 rounded-[2rem] bg-white aspect-square active:scale-95 transition-all shadow-sm">
                      <span className="text-3xl flex shrink-0 items-center justify-center min-h-[2.5rem]">{i.img}</span>
                      <span className="text-[10px] font-black text-slate-700 text-center leading-tight line-clamp-3 flex flex-1 items-end justify-center pt-1">{t(i.en, i.mm)}</span>
                    </button>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'checkout' && (
            <div className="p-6 space-y-6">
              <div className="space-y-3 no-print">
                <input type="text" placeholder="ဆိုင်အမည်" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full px-4 py-4 bg-orange-50 border-2 border-orange-100 rounded-2xl outline-none font-bold text-orange-900" />
                <input type="text" placeholder="ဝယ်သူအမည်..." value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700" />
              </div>

              <div className="print-area bg-white p-6 border-2 border-slate-100 rounded-[2rem]">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{storeName}</h2>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">{new Date().toLocaleString()}</p>
                </div>
                <table className="w-full text-left text-[11px] mb-4">
                  <thead className="border-b-2 border-black font-black uppercase text-[9px]">
                    <tr><th className="pb-2">စဉ်</th><th className="pb-2">အမည်</th><th className="pb-2 text-right">ဈေးနှုန်း</th><th className="pb-2 text-center">ပမာဏ</th><th className="pb-2 text-right">စုစုပေါင်း</th></tr>
                  </thead>
                  <tbody>
                    {lines.map((line: any, idx: number) => (
                      <tr key={line.productId} className="border-b border-slate-50">
                        <td className="py-3 text-slate-400 text-center">
                          <div className="flex items-center gap-1">
                            <span>{idx + 1}</span>
                            <button data-receipt-capture-hide onClick={() => removeFromCart(line.productId)} className="no-print text-red-400"><Trash2 size={12}/></button>
                          </div>
                        </td>
                        <td className="py-3 font-bold">{line.mmName}</td>
                        <td className="py-3 text-right tabular-nums">{line.price.toLocaleString()}</td>
                        <td className="py-3 font-bold text-center">{line.quantity} {line.unit}</td>
                        <td className="py-3 text-right font-black tabular-nums">{line.totalPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                  <span className="font-black text-xs uppercase text-slate-400 italic">Total Cost</span>
                  <span className="text-2xl font-black text-orange-600">{grandTotal.toLocaleString()} MMK</span>
                </div>
              </div>

              {lines.length > 0 && (
                <div className="space-y-3 no-print">
                  <button onClick={() => window.print()} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl"><Printer size={20}/> {t("Print Receipt", "Print ထုတ်မည်")}</button>
                  <button onClick={saveAsImage} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg"><Camera size={20}/> {t("Save as Image", "ဓာတ်ပုံအဖြစ်သိမ်းမည်")}</button>
                  <button onClick={() => { addRecord(lines, grandTotal, customerName); alert("မှတ်တမ်းတင်ပြီးပါပြီ"); }} className="w-full bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-black flex items-center justify-center gap-2"><Save size={18}/> {t("Save Record", "မှတ်တမ်းထဲသိမ်းမည်")}</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-6 space-y-6 no-print pb-32">
              <div className="flex justify-between items-center">
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button onClick={() => setViewMode('list')} className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400'}`}>{t("LIST", "စာရင်း")}</button>
                  <button onClick={() => setViewMode('stats')} className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${viewMode === 'stats' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400'}`}>{t("STATS", "အသုံးစရိတ်")}</button>
                </div>
                <div className="flex gap-1">
                  <button onClick={handleExport} title="Backup" className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100"><Download size={14}/></button>
                  <button onClick={() => fileInputRef.current?.click()} title="Restore" className="p-2 bg-green-50 text-green-600 rounded-xl border border-green-100"><Upload size={14}/></button>
                  <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".json" />
                </div>
              </div>

              {viewMode === 'list' ? (
                <div className="space-y-4">
                  <div className="bg-orange-600 rounded-[2.5rem] p-6 text-white shadow-lg">
                    <div className="text-4xl font-black">{monthlyTotal.toLocaleString()} MMK</div>
                    <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mt-1">{MONTHS_MM[currentMonth]}လ စုစုပေါင်း</p>
                  </div>
                  {history.map((rec: any) => (
                    <button key={rec.id} onClick={() => setSelectedRecord(rec)} className="w-full bg-white border border-slate-100 rounded-[2rem] p-5 flex justify-between items-center shadow-sm active:scale-95">
                      <div className="text-left"><p className="text-[9px] font-bold text-slate-300">{new Date(rec.date).toLocaleDateString()}</p><p className="font-black text-slate-700 uppercase">{rec.customer || 'အမည်မပါ'}</p></div>
                      <div className="flex items-center gap-3 font-black text-orange-600 text-lg">{rec.total.toLocaleString()} <ChevronRight size={16} className="text-slate-200" /></div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                    <h2 className="text-4xl font-black">{stats.periodTotal.toLocaleString()} <span className="text-sm text-orange-500">MMK</span></h2>
                    <p className="text-[10px] font-black opacity-40 uppercase mt-1">စုစုပေါင်းအသုံးစရိတ်</p>
                    <BarChart3 className="absolute -right-4 -bottom-4 opacity-10" size={120} />
                  </div>
                  <div className="space-y-4">
                    {stats.categoryData.map(cat => (
                      <div key={cat.category} className="space-y-2">
                        <div className="flex justify-between text-[11px] font-black text-slate-600"><span>{cat.category}</span><span>{cat.total.toLocaleString()} ({cat.percentage}%)</span></div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="bg-orange-600 h-full transition-all" style={{ width: `${cat.percentage}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-4 flex justify-around items-center no-print z-50">
          <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center gap-1 ${activeTab === 'shop' ? 'text-orange-600' : 'text-slate-300'}`}>
            <Search size={22}/><span className="text-[10px] font-black uppercase">{t("Shop", "ဈေးဝယ်")}</span>
          </button>
          <button onClick={() => setActiveTab('checkout')} className={`relative flex flex-col items-center gap-1 ${activeTab === 'checkout' ? 'text-orange-600' : 'text-slate-300'}`}>
            <ShoppingBasket size={22}/>
            {lines.length > 0 && <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">{lines.length}</span>}
            <span className="text-[10px] font-black uppercase">{t("Cart", "ခြင်းတောင်း")}</span>
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-orange-600' : 'text-slate-300'}`}>
            <History size={22}/><span className="text-[10px] font-black uppercase">{t("History", "မှတ်တမ်း")}</span>
          </button>
        </div>

        {/* EDIT/ADD MODAL */}
        {editingItem && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end max-w-md mx-auto no-print">
            <div className="absolute inset-0 bg-black/40" onClick={() => setEditingItem(null)} />
            <div className="relative z-20 w-full bg-white rounded-t-[3rem] p-8 pb-12 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-black">{editingItem.custom ? 'ပစ္စည်းအသစ်' : t(editingItem.en, editingItem.mm)}</h2>
                 <button onClick={() => setEditingItem(null)} className="p-2 bg-slate-50 rounded-full"><X size={20}/></button>
              </div>
              <div className="space-y-6">
                {editingItem.custom && (
                  <>
                    <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full text-lg font-bold border-b-2 py-2 outline-none focus:border-orange-600" placeholder="ပစ္စည်းအမည်" autoFocus />
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                      {CATEGORIES.map((cat: any) => (
                        <button key={cat.en} type="button" onClick={() => setManualCategoryEn(cat.en)} className={`px-4 py-2 rounded-2xl font-black text-[11px] whitespace-nowrap ${manualCategoryEn === cat.en ? 'bg-orange-600 text-white' : 'bg-slate-50 text-slate-500'}`}>{t(cat.en, cat.mm)}</button>
                      ))}
                    </div>
                  </>
                )}
                <div className="relative border-b-2 border-slate-100 focus-within:border-orange-600">
                  <input type="text" inputMode="numeric" value={inputPrice} onChange={(e) => setInputPrice(e.target.value.replace(/\D/g, ''))} className="market-price-field w-full font-black text-orange-600 py-3 pr-14 outline-none bg-transparent" placeholder="0" autoFocus={!editingItem.custom} />
                  <span className="absolute right-0 bottom-3 text-slate-300 font-black text-xs uppercase tracking-widest">MMK</span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {UNITS.map(u => (
                    <button key={u} type="button" onClick={() => setSelectedUnit(u)} className={`px-5 py-2.5 rounded-xl font-black text-[11px] flex-shrink-0 ${selectedUnit === u ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>{u}</button>
                  ))}
                </div>
                <div className="bg-slate-50 p-2 rounded-[2rem] flex items-center justify-between border border-slate-100">
                  <button type="button" onClick={() => setQtyInputStr(String(Math.max(0, Number((parseFloat(qtyInputStr || '0') - 0.1).toFixed(2)))))} className="p-4 bg-white rounded-2xl shadow-sm text-orange-600"><RefreshCcw size={22} className="rotate-45" /></button>
                  <input type="text" inputMode="decimal" value={qtyInputStr} onChange={(e) => setQtyInputStr(e.target.value.replace(/[^\d.]/g, ''))} className="bg-transparent text-3xl font-black text-center min-w-[5rem] outline-none" />
                  <button type="button" onClick={() => setQtyInputStr(String(Number((parseFloat(qtyInputStr || '0') + 0.1).toFixed(2))))} className="p-4 bg-white rounded-2xl shadow-sm text-orange-600"><Plus size={22} /></button>
                </div>
                <button onClick={() => {
                  const p = Number(inputPrice); const q = parseFloat(qtyInputStr);
                  if (p <= 0 || q <= 0 || (editingItem.custom && !inputName.trim())) return;
                  addToCart({
                    productId: Date.now().toString(),
                    mmName: editingItem.custom ? `📦 ${inputName.trim()}` : `${editingItem.img} ${t(editingItem.en, editingItem.mm)}`,
                    price: p, quantity: q, unit: selectedUnit, totalPrice: Math.round(p * q),
                    categoryEn: editingItem.custom ? manualCategoryEn : editingItem.cat,
                  });
                  setEditingItem(null);
                }} className="w-full bg-orange-600 text-white py-5 rounded-[2.5rem] font-black text-xl shadow-xl active:scale-95 transition-all">ခြင်းတောင်းထဲထည့်မည်</button>
              </div>
            </div>
          </div>
        )}

        {/* SHARE MODAL */}
        {showShareModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 no-print">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowShareModal(false)} />
            <div className="relative bg-white rounded-[3rem] p-10 w-full max-w-sm text-center shadow-2xl">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">အိမ်ရှင်ထီး App ကို ဝေမျှရန်</h3>
              <div className="bg-slate-50 p-6 rounded-[2rem] inline-block mb-6 shadow-inner border border-slate-100">
                <QRCodeSVG value={window.location.href} size={180} />
              </div>
              <p className="text-[10px] font-black text-slate-400 mb-6 px-4">ဖုန်းဖြင့် Scan ဖတ်ပြီး အသုံးပြုနိုင်သလို Homescreen ပေါ်တင်ပြီးလည်း သုံးနိုင်ပါတယ်</p>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link ကူးယူပြီးပါပြီ"); }} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black mb-3">LINK ကူးယူမည်</button>
              <button onClick={() => setShowShareModal(false)} className="w-full text-slate-400 font-bold text-sm">ပိတ်မည်</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};