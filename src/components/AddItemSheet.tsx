import { X, ShoppingCart } from 'lucide-react';
import { Product, CartLine } from '../types';
import { useRef } from 'react';

export const AddItemSheet = ({ product, onClose, onAdd }: { product: Product, onClose: () => void, onAdd: (line: CartLine) => void }) => {
  // Input တွေကို တိုက်ရိုက် ကိုင်တွယ်ဖို့ Ref သုံးပါမယ်
  const priceRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    // ခလုတ်နှိပ်လိုက်မှ တန်ဖိုးကို ဆွဲယူပါမယ်
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
      <div className="w-full max-w-md bg-white rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-gray-800">{product.mmName}</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600"/>
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Input - State မသုံးဘဲ defaultValue သုံးထားလို့ ရိုက်ရတာ လုံးဝချောသွားပါပြီ */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-orange-600 ml-1 uppercase">ဈေးနှုန်း</label>
            <input 
              ref={priceRef}
              type="number"
              inputMode="decimal"
              defaultValue={product.price}
              className="w-full bg-gray-50 p-5 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none"
              placeholder="0" 
            />
          </div>

          {/* Quantity Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-orange-600 ml-1 uppercase">အရေအတွက် ({product.unit})</label>
            <input 
              ref={qtyRef}
              type="number"
              inputMode="decimal"
              defaultValue={1}
              className="w-full bg-gray-50 p-5 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none"
              placeholder="0" 
            />
          </div>
        </div>

        <button 
          onClick={handleAdd} 
          className="w-full mt-8 bg-orange-600 text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg"
        >
          <ShoppingCart size={22} /> စာရင်းထဲထည့်မည်
        </button>
      </div>
    </div>
  );
};