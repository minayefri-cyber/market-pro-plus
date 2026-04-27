import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Search, ShoppingCart, X, Send, Printer } from 'lucide-react';

const CATEGORIES = [
  { en: 'Vegetables', mm: 'ဟင်းသီးဟင်းရွက်', emoji: '🥬' },
  { en: 'Fruits', mm: 'သစ်သီးဝလံ', emoji: '🍎' },
  { en: 'Meat & Fish', mm: 'အသားနှင့်ငါး', emoji: '🍖' },
  { en: 'Rice & Grains', mm: 'ဆန်နှင့် အစေ့အဆန်', emoji: '🌾' },
  { en: 'Oil & Spices', mm: 'ဆီနှင့် ဟင်းခတ်အမွှေးအကြိုင်', emoji: '🧂' },
  { en: 'Dairy', mm: 'နို့ထွက်ပစ္စည်း', emoji: '🥚' },
  { en: 'Drinks', mm: 'အဖျော်ယမကာ', emoji: '🥤' },
  { en: 'Snacks', mm: 'မုန့်မျိုးစုံ', emoji: '🍪' },
  { en: 'Household', mm: 'အိမ်သုံးပစ္စည်း', emoji: '🧴' },
  { en: 'Other', mm: 'အထွေထွေ', emoji: '🎁' }
];

const UNITS = ['ခု', 'ထုပ်', 'ဘူး', 'ပိဿာ', 'ဆယ်သား', 'လုံး', 'ကတ်', 'ပြည်', 'လီတာ', 'ကျပ်သား', 'ထုပ်ငယ်'];

const MASTER_ITEMS = [
  { id: 'v1', en: 'Tomato', mm: 'ခရမ်းချဉ်သီး', cat: 'Vegetables', img: '🍅' },
  { id: 'v2', en: 'Cabbage', mm: 'ဂေါ်ဖီထုပ်', cat: 'Vegetables', img: '🥬' },
  { id: 'v3', en: 'Onion', mm: 'ကြက်သွန်နီ', cat: 'Vegetables', img: '🧅' },
  { id: 'v4', en: 'Potato', mm: 'အာလူး', cat: 'Vegetables', img: '🥔' },
  { id: 'v5', en: 'Carrot', mm: 'မုန်လာဥနီ', cat: 'Vegetables', img: '🥕' },
  { id: 'v6', en: 'Green Chili', mm: 'ငရုတ်သီးစိမ်း', cat: 'Vegetables', img: '🌶️' },
  { id: 'v7', en: 'Water Cress', mm: 'ကန်စွန်းရွက်', cat: 'Vegetables', img: '🌿' },
  { id: 'v8', en: 'Sour Leaf', mm: 'ချဉ်ပေါင်ရွက်', cat: 'Vegetables', img: '🍃' },
  { id: 'v9', en: 'Cucumber', mm: 'သခွားသီး', cat: 'Vegetables', img: '🥒' },
  { id: 'v10', en: 'Eggplant', mm: 'ခရမ်းသီး', cat: 'Vegetables', img: '🍆' },
  { id: 'v11', en: 'Cauliflower', mm: 'ပန်းဂေါ်ဖီ', cat: 'Vegetables', img: '🥦' },
  { id: 'v12', en: 'Long Bean', mm: 'ပဲသီး', cat: 'Vegetables', img: '🎋' },
  { id: 'v13', en: 'Pumpkin', mm: 'ရွှေဖရုံသီး', cat: 'Vegetables', img: '🎃' },
  { id: 'v14', en: 'Bottle Gourd', mm: 'ဘူးသီး', cat: 'Vegetables', img: '🥒' },
  { id: 'v15', en: 'Coriander', mm: 'နံနံပင်', cat: 'Vegetables', img: '🌱' },
  { id: 'v16', en: 'Bell Pepper', mm: 'ငရုတ်ပွ', cat: 'Vegetables', img: '🫑' },
  { id: 'v17', en: 'Mushroom', mm: 'မှို', cat: 'Vegetables', img: '🍄' },
  { id: 'v18', en: 'Corn', mm: 'ပြောင်းဖူး', cat: 'Vegetables', img: '🌽' },
  { id: 'v19', en: 'Lime', mm: 'သံပရာသီး', cat: 'Vegetables', img: '🍋' },
  { id: 'v20', en: 'Radish', mm: 'မုန်လာဥဖြူ', cat: 'Vegetables', img: '🥥' },
  { id: 'v21', en: 'Kale', mm: 'ကိုက်လန်', cat: 'Vegetables', img: '🥬' },
  { id: 'v22', en: 'Spinach', mm: 'ဟင်းနုနွယ်', cat: 'Vegetables', img: '🌿' },
  { id: 'v23', en: 'Acacia Leaf', mm: 'ဆူးပုတ်', cat: 'Vegetables', img: '🌿' },
  { id: 'v24', en: 'Bitter Leaf', mm: 'ဂွေးတောက်ရွက်', cat: 'Vegetables', img: '🍃' },
  { id: 'v25', en: 'Napa Cabbage', mm: 'မုန်ညင်းဖြူ', cat: 'Vegetables', img: '🥬' },
  { id: 'v26', en: 'Okra', mm: 'ရုံးပတီသီး', cat: 'Vegetables', img: '🥒' },
  { id: 'm1', en: 'Chicken (CP)', mm: 'ကြက်သား (CP)', cat: 'Meat & Fish', img: '🍗' },
  { id: 'm2', en: 'Pork', mm: 'ဝက်သား', cat: 'Meat & Fish', img: '🥩' },
  { id: 'fi1', en: 'Carp Fish', mm: 'ငါးမြစ်ချင်း', cat: 'Meat & Fish', img: '🐟' },
  { id: 'rg1', en: 'Shwe Bo Rice', mm: 'ဆန် (ရွှေဘိုပေါ်ဆန်း)', cat: 'Rice & Grains', img: '🌾' },
  { id: 'os1', en: 'Peanut Oil', mm: 'ပဲဆီသန့်', cat: 'Oil & Spices', img: '🧴' },
  { id: 'os6', en: 'Garlic', mm: 'ကြက်သွန်ဖြူ', cat: 'Oil & Spices', img: '🧄' },
  { id: 'd1', en: 'Egg', mm: 'ကြက်ဥ', cat: 'Dairy', img: '🥚' },
  { id: 'hh1', en: 'Soap Bar', mm: 'ဆပ်ပြာခဲ', cat: 'Household', img: '🧼' }
];

export const CatalogView = () => {
  const { lines = [], addToCart } = useCart();
  const [activeCat, setActiveCat] = useState('Vegetables');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [lang, setLang] = useState<'EN' | 'MM'>('MM');
  
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputQty, setInputQty] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('ခု');

  const t = (en: string, mm: string) => (lang === 'EN' ? en : mm);
  const grandTotal = lines.reduce((sum, line) => sum + line.totalPrice, 0);

  const startEditing = (item: any) => {
    setInputPrice('');
    setInputQty(1);
    setSelectedUnit('ခု');
    if (!item) {
      setEditingItem({ custom: true });
      setInputName('');
    } else {
      setEditingItem(item);
      setInputName(t(item.en, item.mm));
    }
  };

  const handleSave = () => {
    if (!inputPrice || (editingItem?.custom && !inputName)) return;
    const finalName = editingItem.custom ? `📦 ${inputName}` : `${editingItem.img} ${t(editingItem.en, editingItem.mm)}`;
    addToCart({
      productId: Date.now().toString(),
      mmName: finalName,
      price: Number(inputPrice),
      quantity: inputQty,
      unit: selectedUnit,
      totalPrice: Number(inputPrice) * inputQty
    });
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden relative print:bg-white">
      {/* HEADER SECTION - Hidden on Print */}
      <div className="bg-white border-b z-20 print:hidden">
        <div className="max-w-md mx-auto p-4 flex gap-2">
          <button onClick={() => setLang(l => l === 'EN' ? 'MM' : 'EN')} className="bg-slate-100 px-4 rounded-2xl flex flex-col items-center justify-center border border-slate-200 active:scale-90 shadow-sm min-w-[60px]">
            <span className="text-xl leading-none">{lang === 'EN' ? '🇺🇸' : '🇲🇲'}</span>
            <span className="text-[8px] font-black text-slate-500 mt-1 uppercase">{lang}</span>
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder={t("Search...", "ပစ္စည်းရှာရန်...")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-2xl outline-none font-bold text-slate-700" />
          </div>
          <button onClick={() => startEditing(null)} className="bg-orange-600 text-white p-3 rounded-2xl shadow-lg active:scale-95 transition-transform"><Plus size={24} /></button>
        </div>
        <div className="max-w-md mx-auto flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(c => (
            <button key={c.en} onClick={() => { setActiveCat(c.en); setSearchTerm(''); }} className={`px-5 py-2 rounded-xl whitespace-nowrap text-[11px] font-black transition-all ${activeCat === c.en ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 border border-transparent'}`}>{c.emoji} {t(c.en, c.mm)}</button>
          ))}
        </div>
      </div>

      {/* ITEM GRID - Hidden on Print */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-white print:hidden px-4">
        <div className="max-w-md mx-auto p-4 pb-80 grid grid-cols-3 gap-4">
          {MASTER_ITEMS.filter(i => {
            const matchesSearch = searchTerm === '' || i.en.toLowerCase().includes(searchTerm.toLowerCase()) || i.mm.includes(searchTerm);
            return searchTerm ? matchesSearch : (i.cat === activeCat && matchesSearch);
          }).map(i => (
            <button key={i.id} onClick={() => startEditing(i)} className="flex flex-col items-center justify-center p-4 border border-slate-50 rounded-[2.5rem] shadow-sm active:bg-orange-50 active:scale-95 transition-all aspect-square bg-white">
              <span className="text-4xl mb-2">{i.img}</span>
              <span className="text-[10px] font-black text-slate-700 text-center leading-tight">{t(i.en, i.mm)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER ACTIONS - Hidden on Print */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white/80 backdrop-blur-md print:hidden">
        <div className="max-w-md mx-auto space-y-3">
          <div className="bg-slate-900 text-white p-5 rounded-[2rem] flex justify-between items-center shadow-2xl">
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{t("Grand Total", "စုစုပေါင်း")}</p>
              <p className="text-2xl font-black text-orange-400 leading-none">{grandTotal.toLocaleString()} <span className="text-sm ml-1 text-slate-400">MMK</span></p>
            </div>
            <div className="bg-orange-600 p-3.5 rounded-2xl"><ShoppingCart size={22} strokeWidth={3} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#7360F2] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg">
              <Send size={18} /> {t("Viber", "Viber ပို့ရန်")}
            </button>
            <button onClick={() => window.print()} className="bg-slate-100 text-slate-700 border-2 border-slate-200 py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all">
              <Printer size={18} /> {t("Print PDF", "PDF ထုတ်ရန်")}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL - RESTORED & CORRECTED */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end items-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingItem(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-[3rem] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-black text-slate-800">{editingItem.custom ? t('New Item', 'ပစ္စည်းအသစ်') : t(editingItem.en, editingItem.mm)}</h2>
              <button onClick={() => setEditingItem(null)} className="p-2 bg-slate-50 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            <div className="space-y-6">
              {editingItem.custom && (
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">{t("Item Name", "ပစ္စည်းအမည်")}</label>
                  <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full text-xl font-bold border-b-2 border-slate-100 py-3 outline-none focus:border-orange-500 text-slate-900" placeholder={t("Enter name...", "အမည်ရိုက်ပါ...")} />
                </div>
              )}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">{t("Price (Kyat)", "စျေးနှုန်း (ကျပ်)")}</label>
                <input type="text" inputMode="decimal" value={inputPrice} onChange={(e) => setInputPrice(e.target.value.replace(/[^0-9]/g, ''))} className="w-full text-5xl font-black border-b-4 border-slate-100 py-3 outline-none focus:border-orange-500 text-orange-600" placeholder="0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-2 rounded-3xl flex items-center justify-between border border-slate-100">
                  <button onClick={() => setInputQty(q => Math.max(1, q - 1))} className="p-4 bg-white rounded-2xl shadow-sm text-orange-600 active:scale-90"><Minus size={20}/></button>
                  <span className="text-2xl font-black text-slate-800">{inputQty}</span>
                  <button onClick={() => setInputQty(q => q + 1)} className="p-4 bg-white rounded-2xl shadow-sm text-orange-600 active:scale-90"><Plus size={20}/></button>
                </div>
                <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)} className="w-full bg-slate-50 p-4 rounded-3xl font-black text-lg border border-slate-100 outline-none">
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <button onClick={handleSave} disabled={!inputPrice || (editingItem.custom && !inputName)} className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl active:scale-95 disabled:opacity-30 transition-all">
                {t("Add to Basket", "ခြင်းတောင်းထဲထည့်မည်")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINT-ONLY RECEIPT - Sr.No. FIXED */}
      <div className="hidden print:block p-8 w-full max-w-2xl mx-auto">
        <h1 className="text-center text-4xl font-black text-orange-600 mb-2">Market Pro+</h1>
        <p className="text-center text-slate-500 mb-8 font-bold text-lg">ဈေးဝယ်စာရင်း (Shopping List)</p>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-4 border-slate-900">
              <th className="py-4 text-lg font-black uppercase w-16">စဉ်</th>
              <th className="py-4 text-lg font-black uppercase">ပစ္စည်းအမည်</th>
              <th className="py-4 text-lg font-black uppercase text-right">အရေအတွက်</th>
              <th className="py-4 text-lg font-black uppercase text-right">စုစုပေါင်း</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={line.productId} className="border-b border-slate-200">
                <td className="py-5 font-bold text-slate-500 text-lg">{(index + 1).toString().padStart(2, '0')}.</td>
                <td className="py-5 font-bold text-lg">{line.mmName}</td>
                <td className="py-5 text-right font-bold text-lg">{line.quantity} {line.unit}</td>
                <td className="py-5 text-right font-black text-lg">{line.totalPrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10 pt-6 border-t-4 border-slate-900 flex justify-between items-center">
            <span className="text-2xl font-black uppercase">စုစုပေါင်း (Total)</span>
            <span className="text-4xl font-black text-orange-600">{grandTotal.toLocaleString()} ကျပ်</span>
        </div>
      </div>
    </div>
  );
};