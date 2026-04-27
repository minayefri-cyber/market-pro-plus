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
  // ရိုက်ရတာ ချောမွေ့အောင် string နဲ့ပဲ စသိမ်းထားပါမယ်
  const [p, setP] = useState(product.price.toString());
  const [q, setQ] = useState("1");

  const handleAdd = () => {
    const finalP = parseFloat(p) || 0;
    const finalQ = parseFloat(q) || 0;

    if (finalQ > 0) {
      onAdd({ 
        productId: product.id, 
        mmName: product.mmName, 
        price: finalP, 
        quantity: finalQ, 
        unit: product.unit, 
        totalPrice: finalP * finalQ 
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-8 shadow-2xl">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-gray-800">{product.mmName}</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600"/>
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-orange-600 ml-2 uppercase">ဈေးနှုန်း</label>
            <input 
              type="text"
              inputMode="decimal"
              value={p} 
              onChange={e => setP(e.target.value)} 
              className="w-full bg-gray-50 p-4 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none transition-all" 
              placeholder="0" 
            />
          </div>

          {/* Quantity Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-orange-600 ml-2 uppercase">အရေအတွက် ({product.unit})</label>
            <input 
              type="text"
              inputMode="decimal"
              value={q} 
              onChange={e => setQ(e.target.value)} 
              className="w-full bg-gray-50 p-4 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none transition-all" 
              placeholder="0" 
            />
          </div>
        </div>

        {/* Total Display */}
        <div className="mt-6 p-4 bg-orange-50 rounded-2xl flex justify-between items-center">
          <span className="text-orange-800 font-bold">စုစုပေါင်း:</span>
          <span className="text-2xl font-black text-orange-600">
            {((parseFloat(p) || 0) * (parseFloat(q) || 0)).toLocaleString()} ကျပ်
          </span>
        </div>

        <button 
          onClick={handleAdd} 
          className="w-full mt-8 bg-orange-600 text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <ShoppingCart size={22} /> စာရင်းထဲထည့်မည်
        </button>
      </div>
    </div>
  );
};