import { useState, useEffect, useMemo, useRef } from 'react';
import { useCart } from './context/CartContext';
import { useHistory } from './context/HistoryContext';
import { CATEGORIES, MASTER_ITEMS, catalogItemMatchesSearch } from './data/catalog';
import { Plus, Search, X, Printer, ShoppingBasket, Trash2, History, BarChart3, ChevronRight, Save, RefreshCcw, Camera, Share2, Download, Upload } from 'lucide-react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

export const MarketApp = () => {
  const { lines = [], addToCart, removeFromCart, clearCart } = useCart();
  // History Context မှ deleteRecord နှင့် setHistory ကို ခေါ်ယူထားပါသည်
  const { history, addRecord, clearHistory, deleteRecord, setHistory } = useHistory(); 
  
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
  useEffect(() => {
    if (!validCategoryEns.has(activeCat)) {
      setActiveCat(CATEGORIES[0]?.en ?? 'Vegetables');
    }
  }, [validCategoryEns, activeCat]);

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
          if(setHistory) setHistory(importedData);
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
      rec.items?.forEach((it: any) => {
        const catEnFromLine = typeof it.categoryEn === 'string' && validCategoryEns.has(it.categoryEn) ? it.categoryEn : MASTER_ITEMS.find((m: any) => it.mmName.includes(m.mm))?.cat;
        const catEn = catEnFromLine ?? 'Others';
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
  }, [history, statsPeriod, selectedMonths, lang, validCategoryEns]);

  const toggleMonth = (idx: number) => {
    setSelectedMonths(prev => prev.includes(idx) ? prev.filter(m => m !== idx) : [...prev, idx]);
  };

  const handlePrint = () => window.print();
  
  const saveAsImage = async () => {
    const element = document.querySelector('.print-area') as HTMLElement;
    if (!element) return;
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      onclone: (_doc, cloned) => {
        cloned.querySelectorAll('[data-receipt-capture-hide]').forEach((node) => node.remove());
        cloned.querySelectorAll('.print-area tbody button').forEach((node) => node.remove());
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
        input.market-price-field { font-size: clamp(1.75rem, 7vw, 2.75rem) !important; line-height: 1.15 !important; -webkit-appearance: none; appearance: none; }
        @media print {
          body * { visibility: hidden !important; }
          .print-area, .print-area * { visibility: visible !important; }
          .print-area { position: fixed !important; left: 0 !important; top: 0 !important; width: 100% !important; padding: 20px !important; background: white !important; }
          .no-print { display: none !important; }
          .print-area [data-receipt-capture-hide] { display: none !important; visibility: hidden !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col h-screen overflow-hidden relative border-x border-slate-200">
        
        {/* HEADER */}
        <div className="bg-white p-4 flex justify-between items-center border-b no-print sticky top-0 z-40">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-orange-600 italic tracking-tighter">{t("Ainsin Htee", "အိမ်ရှင်ထီး")}</h1>
            <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Shopping Assistant</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowShareModal(true)} className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-slate-400 shadow-sm active:scale-95"><Share2 size={18}/></button>
            <button onClick={() => setLang(l => l === 'EN' ? 'MM' : 'EN')} className="bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200 text-lg shadow-sm active:scale-95">
              {lang === 'EN' ? '🇺🇸' : '🇲🇲'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
          {/* SHOP TAB */}
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
                    <button key={i.id} type="button" onClick={() => { setEditingItem(i); setInputPrice(''); setQtyInputStr('1'); }} className="flex flex-col items-stretch justify-between p-3 border border-slate-100 rounded-[2rem] bg-white aspect-square active:scale-95 transition-all shadow-sm min-h-0">
                      <span className="text-3xl leading-none flex shrink-0 items-center justify-center min-h-[2.5rem]" aria-hidden>{i.img}</span>
                      <span className="text-[10px] font-black text-slate-700 text-center leading-tight line-clamp-3 flex flex-1 items-end justify-center pt-1">{t(i.en, i.mm)}</span>
                    </button>
                 ))}
              </div>
            </div>
          )}

          {/* CHECKOUT TAB */}
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
                  {customerName && <p className="text-xs font-black mt-3 border-t pt-3 uppercase">ဝယ်သူ: {customerName}</p>}
                </div>
                <table className="w-full text-left text-[11px] mb-4 border-collapse">
                  <thead className="border-b-2 border-black font-black uppercase text-[9px]">
                    <tr><th className="pb-2">စဉ်</th><th className="pb-2">အမည်</th><th className="pb-2 text-right">ဈေးနှုန်း</th><th className="pb-2 text-center">ပမာဏ</th><th className="pb-2 text-right">စုစုပေါင်း</th></tr>
                  </thead>
                  <tbody>
                    {lines.map((line: any, idx: number) => (
                      <tr key={line.productId} className="border-b border-slate-50">
                        <td className="py-3 text-slate-400 align-middle whitespace-nowrap w-10 text-center tabular-nums">
                          <span className="inline-block min-w-[1.25rem] text-center">{idx + 1}</span>
                          <button type="button" data-receipt-capture-hide onClick={() => removeFromCart(line.productId)} className="no-print inline-block align-middle ml-1.5 p-0.5 text-red-400 receipt-line-delete">
                            <Trash2 size={12} />
                          </button>
                        </td>
                        <td className="py-3 font-bold align-middle">{line.mmName}</td>
                        <td className="py-3 text-right text-slate-500 align-middle tabular-nums">{line.price.toLocaleString()}</td>
                        <td className="py-3 font-bold text-center align-middle whitespace-nowrap">{line.quantity} {line.unit}</td>
                        <td className="py-3 text-right font-black align-middle tabular-nums">{line.totalPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                  <span className="font-black text-xs uppercase text-slate-400 tracking-widest italic">Total Cost</span>
                  <span className="text-2xl font-black text-orange-600">{grandTotal.toLocaleString()} MMK</span>
                </div>
              </div>

              {lines.length > 0 && (
                <div className="space-y-3 no-print">
                  <button onClick={handlePrint} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 shadow-xl"><Printer size={20}/> {t("Print Receipt", "Print ထုတ်မည်")}</button>
                  <button onClick={saveAsImage} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 shadow-lg"><Camera size={20}/> {t("Save as Image", "ဓာတ်ပုံအဖြစ်သိမ်းမည်")}</button>
                  <button onClick={() => { addRecord(lines, grandTotal, customerName); alert("မှတ်တမ်းတင်ပြီးပါပြီ"); }} className="w-full bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95"><Save size={18}/> {t("Save Record", "မှတ်တမ်းထဲသိမ်းမည်")}</button>
                  
                  {/* "ရှင်းလင်းမည်" (Clear Cart) ခလုတ် ပြန်ထည့်ထားပါသည် */}
                  <button onClick={() => { if(confirm("စာရင်းအားလုံးကို ဖျက်မလား?")) clearCart(); }} className="w-full bg-red-50 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95"><RefreshCcw size={16}/> ရှင်းလင်းမည်</button>
                </div>
              )}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="p-6 space-y-6 no-print pb-32">
              <div className="flex justify-between items-center">
                <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner">
                  <button onClick={() => setViewMode('list')} className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400'}`}>{t("LIST", "စာရင်း")}</button>
                  <button onClick={() => setViewMode('stats')} className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${viewMode === 'stats' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400'}`}>{t("STATS", "အသုံးစရိတ်")}</button>
                </div>
                
                {/* Export, Import နှင့် အားလုံးဖျက်မည် ခလုတ်များ */}
                <div className="flex gap-2 items-center">
                  {viewMode === 'list' && (
                    <>
                      <button onClick={handleExport} title="Backup" className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100"><Download size={14}/></button>
                      <button onClick={() => fileInputRef.current?.click()} title="Restore" className="p-2 bg-green-50 text-green-600 rounded-xl border border-green-100"><Upload size={14}/></button>
                      <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".json" />
                      <button onClick={() => { if(confirm("မှတ်တမ်းအားလုံးကို အပြီးတိုင် ဖျက်မလား?")) clearHistory(); }} className="px-4 py-1.5 bg-red-50 text-red-500 rounded-xl text-[10px] font-black border border-red-100">
                        {t("Clear All", "အားလုံးဖျက်မည်")}
                      </button>
                    </>
                  )}
                  {viewMode === 'stats' && (
                    <select value={statsPeriod} onChange={(e) => setStatsPeriod(e.target.value as any)} className="bg-slate-50 px-2 py-1.5 rounded-xl text-[10px] font-black text-slate-500 border border-slate-100 outline-none">
                      <option value="week">ဒီအပတ်</option>
                      <option value="month">လအလိုက်</option>
                      <option value="year">ဒီနှစ်</option>
                      <option value="all">အားလုံး</option>
                    </select>
                  )}
                </div>
              </div>

              {viewMode === 'list' ? (
                <div className="space-y-4">
                  <div className="bg-orange-600 rounded-[2.5rem] p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 opacity-80 uppercase text-[10px] font-black tracking-widest"><BarChart3 size={18}/> {MONTHS_MM[currentMonth]}လ စုစုပေါင်း</div>
                    <div className="text-4xl font-black">{monthlyTotal.toLocaleString()} MMK</div>
                  </div>
                  {history.length === 0 ? (
                    <div className="text-center py-20 text-slate-300 font-bold">မှတ်တမ်းမရှိသေးပါ။</div>
                  ) : (
                    history.map((rec: any) => (
                      <div key={rec.id} className="relative group">
                        {/* မှတ်တမ်းအသေးစိတ်ကြည့်ရန် ခလုတ် (Clickable Card) */}
                        <button onClick={() => setSelectedRecord(rec)} className="w-full bg-white border border-slate-100 rounded-[2rem] p-5 flex justify-between items-center shadow-sm active:scale-95 transition-all pr-12">
                          <div className="text-left"><p className="text-[9px] font-bold text-slate-300">{new Date(rec.date).toLocaleDateString()}</p><p className="font-black text-slate-700 uppercase tracking-tighter">{rec.customer || 'အမည်မပါ'}</p></div>
                          <div className="flex items-center gap-3 font-black text-orange-600 text-lg">{rec.total.toLocaleString()} <ChevronRight size={16} className="text-slate-200" /></div>
                        </button>
                        
                        {/* တစ်ခုချင်းစီကို ဖျက်မည့် အမှိုက်ပုံး ခလုတ် (Individual Delete Icon) */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if(confirm("ဒီမှတ်တမ်းကို ဖျက်မလား?")) {
                              if(deleteRecord) deleteRecord(rec.id);
                            }
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-red-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                  {statsPeriod === 'month' && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">ကြည့်ရှုမည့် လများကိုရွေးပါ</h3>
                      <div className="flex flex-wrap gap-2">
                        {MONTHS_MM.map((m, idx) => (
                          <button key={idx} onClick={() => toggleMonth(idx)} className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${selectedMonths.includes(idx) ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-200' : 'bg-white border-slate-100 text-slate-400'}`}>{m}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">{statsPeriod === 'month' ? `${selectedMonths.length} လစာ ` : ''}စုစုပေါင်းအသုံးစရိတ်</p>
                    <h2 className="text-4xl font-black">{stats.periodTotal.toLocaleString()} <span className="text-sm text-orange-500">MMK</span></h2>
                    <BarChart3 className="absolute -right-4 -bottom-4 opacity-10" size={120} />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Category အလိုက်</h3>
                    {stats.categoryData.map(cat => (
                      <div key={cat.category} className="space-y-2">
                        <div className="flex justify-between text-[11px] font-black text-slate-600"><span>{cat.category}</span><span>{cat.total.toLocaleString()} ({cat.percentage}%)</span></div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="bg-orange-600 h-full rounded-full transition-all duration-700" style={{ width: `${cat.percentage}%` }} /></div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">ထိပ်တန်းဝယ်ယူမှုများ</h3>
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 divide-y divide-slate-50 overflow-hidden shadow-sm">
                      {stats.allItemData.slice(0, 10).map((item, idx) => (
                        <div key={idx} className="p-5 flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center ${idx < 3 ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-300'}`}>{idx + 1}</span>
                            <span className="text-sm font-bold text-slate-700">{item.name}</span>
                          </div>
                          <div className="text-right"><p className="text-sm font-black text-slate-900">{item.total.toLocaleString()}</p><p className="text-[9px] font-bold text-slate-400">{item.qty} {item.unit}</p></div>
                        </div>
                      ))}
                    </div>
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

        {/* EDIT MODAL */}
        {editingItem && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end max-w-md mx-auto no-print">
            <div className="absolute inset-0 z-0 bg-black/40" onClick={() => setEditingItem(null)} />
            <div className="relative z-20 w-full bg-white rounded-t-[3rem] p-8 pb-12 shadow-2xl pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-black">{editingItem.custom ? 'ပစ္စည်းအသစ်' : t(editingItem.en, editingItem.mm)}</h2>
                 <button onClick={() => setEditingItem(null)} className="p-2 bg-slate-50 rounded-full active:bg-slate-100"><X size={20}/></button>
              </div>
              <div className="space-y-6">
                {editingItem.custom && (
                  <>
                    <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full text-lg font-bold border-b-2 py-2 outline-none focus:border-orange-600 bg-transparent" placeholder="ပစ္စည်းအမည်" autoFocus enterKeyHint="next" />
                    <div className="relative z-10 border-b-2 border-slate-100 focus-within:border-orange-600">
                      <input type="text" inputMode="numeric" autoComplete="off" readOnly={false} value={inputPrice} onChange={(e) => setInputPrice(e.target.value.replace(/\D/g, ''))} className="market-price-field w-full font-black text-orange-600 py-3 pr-14 outline-none bg-transparent" placeholder="0" />
                      <span className="pointer-events-none absolute right-0 bottom-3 text-slate-300 font-black text-xs uppercase tracking-widest">MMK</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t('Category', 'ကဏ္ဍ')}</p>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                        {CATEGORIES.map((cat: { en: string; mm: string }) => (
                          <button key={cat.en} type="button" onClick={() => setManualCategoryEn(cat.en)} className={`px-4 py-2 rounded-2xl font-black text-[11px] whitespace-nowrap flex-shrink-0 transition-all ${manualCategoryEn === cat.en ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>{t(cat.en, cat.mm)}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {!editingItem.custom && (
                <div className="relative z-10 border-b-2 border-slate-100 focus-within:border-orange-600">
                  <input type="text" inputMode="numeric" autoComplete="off" readOnly={false} value={inputPrice} onChange={(e) => setInputPrice(e.target.value.replace(/\D/g, ''))} className="market-price-field w-full font-black text-orange-600 py-3 pr-14 outline-none bg-transparent" placeholder="0" autoFocus />
                  <span className="pointer-events-none absolute right-0 bottom-3 text-slate-300 font-black text-xs uppercase tracking-widest">MMK</span>
                </div>
                )}
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {UNITS.map(u => (
                    <button key={u} type="button" onClick={() => setSelectedUnit(u)} className={`px-5 py-2.5 rounded-xl font-black text-[11px] flex-shrink-0 transition-all ${selectedUnit === u ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>{u}</button>
                  ))}
                </div>
                <div className="bg-slate-50 p-2 rounded-[2rem] flex items-center justify-between border border-slate-100 relative z-10">
                  <button type="button" onClick={() => { const cur = parseFloat(qtyInputStr); const base = Number.isFinite(cur) ? cur : 0; setQtyInputStr(String(Math.max(0, Number((base - 0.1).toFixed(2))))); }} className="p-4 bg-white rounded-2xl shadow-sm text-orange-600 active:scale-90"><RefreshCcw size={22} className="rotate-45" /></button>
                  <input type="text" inputMode="decimal" readOnly={false} value={qtyInputStr} onChange={(e) => { let v = e.target.value.replace(/[^\d.]/g, ''); const dot = v.indexOf('.'); if (dot !== -1) { v = v.slice(0, dot + 1) + v.slice(dot + 1).replace(/\./g, ''); } setQtyInputStr(v); }} className="bg-transparent text-3xl font-black text-center min-w-[5rem] max-w-[7rem] flex-1 outline-none text-slate-800" />
                  <button type="button" onClick={() => { const cur = parseFloat(qtyInputStr); const base = Number.isFinite(cur) ? cur : 0; setQtyInputStr(String(Number((base + 0.1).toFixed(2)))); }} className="p-4 bg-white rounded-2xl shadow-sm text-orange-600 active:scale-90"><Plus size={22} /></button>
                </div>
                <button onClick={() => {
                  const p = Number(inputPrice); const q = parseFloat(qtyInputStr);
                  if (!Number.isFinite(p) || p <= 0 || !Number.isFinite(q) || q <= 0 || (editingItem.custom && !inputName.trim())) return;
                  const categoryEn = editingItem.custom ? (validCategoryEns.has(manualCategoryEn) ? manualCategoryEn : 'Others') : editingItem.cat;
                  const finalName = editingItem.custom ? `📦 ${inputName.trim()}` : `${editingItem.img} ${t(editingItem.en, editingItem.mm)}`;
                  addToCart({ productId: Date.now().toString(), mmName: finalName, price: p, quantity: q, unit: selectedUnit, totalPrice: Math.round(p * q), categoryEn });
                  setEditingItem(null);
                }} className="w-full bg-orange-600 text-white py-5 rounded-[2.5rem] font-black text-xl shadow-xl active:scale-95 transition-all uppercase tracking-tight">ခြင်းတောင်းထဲထည့်မည်</button>
              </div>
            </div>
          </div>
        )}

        {/* RECORD DETAIL MODAL (ပြန်ထည့်ထားသော အပိုင်း) */}
        {selectedRecord && (
          <div className="fixed inset-0 z-[110] flex flex-col justify-end max-w-md mx-auto p-4 pb-0 no-print">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedRecord(null)} />
            <div className="relative w-full bg-white rounded-t-[3rem] p-8 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="text-center mb-6">
                  <h2 className="text-xl font-black uppercase text-slate-900 tracking-tight">ဘောင်ချာအဟောင်း</h2>
                  <p className="text-[10px] text-slate-400 font-bold">{new Date(selectedRecord.date).toLocaleString()}</p>
              </div>
              <table className="w-full text-[11px] mb-8 border-collapse">
                <thead>
                  <tr className="text-slate-400 text-left border-b-2 border-slate-100 uppercase text-[9px]">
                    <th className="pb-2">စဉ်</th><th className="pb-2">အမည်</th><th className="pb-2 text-right">ဈေးနှုန်း</th><th className="pb-2 text-center">ပမာဏ</th><th className="pb-2 text-right">စုစုပေါင်း</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRecord.items?.map((it: any, idx: number) => (
                    <tr key={idx} className="border-b border-slate-50">
                      <td className="py-3 text-slate-400">{idx + 1}</td>
                      <td className="py-3 font-bold">{it.mmName}</td>
                      <td className="py-3 text-right tabular-nums">{it.price.toLocaleString()}</td>
                      <td className="py-3 text-center">{it.quantity} {it.unit}</td>
                      <td className="py-3 text-right font-black tabular-nums">{it.totalPrice.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center pt-4 border-t-2 border-black mb-8">
                <span className="font-black text-xs uppercase text-slate-400">Total</span>
                <span className="text-2xl font-black text-orange-600">{selectedRecord.total.toLocaleString()} MMK</span>
              </div>
              <button onClick={() => setSelectedRecord(null)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black active:scale-95">ပိတ်မည်</button>
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