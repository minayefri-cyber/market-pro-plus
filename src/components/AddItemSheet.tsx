import { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Product, CartLine } from '../types';

export const AddItemSheet = ({ 
  product, 
  onClose, 
  onAdd 
}: { 
  product: Product, 
  onClose: () => void, 
  onAdd: (line: CartLine) => void 
}) => {
  // input တွေမှာ အလွယ်တကူ ရိုက်နိုင်ဖို့ string နဲ့ပဲ စတင်ထားပါတယ်
  const [p, setP] = useState<string>(product.price.toString());
  const [q, setQ] = useState<string>("1");

  const handleAdd = () => {
    const finalPrice = parseFloat(p) || 0;
    const finalQty = parseFloat(q) || 0;

    if (finalQty > 0) {
      onAdd({ 
        productId: product.id, 
        mmName: product.mmName, 
        price: finalPrice, 
        quantity: finalQty, 
        unit: product.unit, 
        totalPrice: finalPrice * finalQty 
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm font-medium">ပစ္စည်းအမည်</span>
            <h3 className="text-3xl font-black text-gray-800">{product.mmName}</h3>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-100 rounded-full active:bg-gray-200 transition-all">
            <X size={24} className="text-gray-600"/>
          </button>
        </div>

        <div className="space-y-8">
          {/* Price Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-orange-600 uppercase tracking-wider ml-2">ဈေးနှုန်း (MMK)</label>
            <input 
              type="number" 
              pattern="[0-9]*"
              inputMode="decimal"
              value={p} 
              onChange={e => setP(e.target.value)} 
              onFocus={(e) => e.target.select()} // နှိပ်လိုက်ရင် အကုန် select ဖြစ်သွားအောင်လို့ပါ
              className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-2xl font-black border-2 border-transparent focus:border-orange-500 outline-none transition-all" 
              placeholder="0" 
            />
          </div>

          {/* Quantity Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-orange-600 uppercase tracking-wider ml-2">ဝယ်ယူမည့် ပမာဏ ({product.unit})</label>
            <div className="relative">
              <input 
                type="number" 
                pattern="[0-9]*"
                inputMode="decimal"
                value={q} 
                onChange={e => setQ(e.target.value)} 
                onFocus={(e) => e.target.select()}
                className="w-full bg-gray-100 p-6 rounded-[2rem] text-4xl font-black text-center border-none focus:ring-4 focus:ring-orange-100 outline-none transition-all" 
                placeholder="0" 
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold pointer-events-none">
                {product.unit}
              </div>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="mt-8 p-5 bg-orange-50 rounded-2xl flex justify-between items-center border border-orange-100">
          <span className="text-orange-800 font-bold">စုစုပေါင်း ကျသင့်ငွေ</span>
          <span className="text-2xl font-black text-orange-600">
            {( (parseFloat(p) || 0) * (parseFloat(q) || 0) ).toLocaleString()} ကျပ်
          </span>
        </div>

        <button 
          onClick={handleAdd} 
          disabled={!q || parseFloat(q) <= 0}
          className="w-full mt-6 bg-orange-600 active:bg-orange-700 disabled:bg-gray-300 text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-lg transition-all"
        >
          <ShoppingCart size={24} /> ခြင်းတောင်းထဲထည့်မည်
        </button>
      </div>
    </div>
  );
};