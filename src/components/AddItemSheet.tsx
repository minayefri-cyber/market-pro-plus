import { X, ShoppingCart } from 'lucide-react';
import { Product, CartLine } from '../types';
import { useRef } from 'react';

export const AddItemSheet = ({ product, onClose, onAdd }: { product: Product, onClose: () => void, onAdd: (line: CartLine) => void }) => {
  // State အစား Ref ကို သုံးလိုက်ပါမယ် (ဒါဆိုရင် React က ဝင်မနှောက်ယှက်တော့လို့ ရိုက်ရတာ လုံးဝချောသွားပါပြီ)
  const priceRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const p = parseFloat(priceRef.current?.value || "0");
    const q = parseFloat(qtyRef.current?.value || "0");

    if (q > 0) {
      onAdd({ 
        productId: product.id, 
        mmName: product.mmName, 
        price: p, 
        quantity: q, 
        unit: product.unit, 
        totalPrice: p * q 
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-gray-800">{product.mmName}</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-orange-600 ml-1 uppercase">ဈေးနှုန်း</label>
            <input 
              ref={priceRef}
              type="number"
              inputMode="decimal"
              defaultValue={product.price}
              className="w-full bg-gray-50 p-4 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-orange-600 ml-1 uppercase">အရေအတွက် ({product.unit})</label>
            <input 
              ref={qtyRef}
              type="number"
              inputMode="decimal"
              defaultValue={1}
              className="w-full bg-gray-50 p-4 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none"
            />
          </div>
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