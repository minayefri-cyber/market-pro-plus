import { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Product, CartLine } from '../types';

export const AddItemSheet = ({ product, onClose, onAdd }: { product: Product, onClose: () => void, onAdd: (line: CartLine) => void }) => {
  const [p, setP] = useState(product.price);
  const [q, setQ] = useState(1);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black">{product.mmName}</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        <div className="space-y-6">
          <input type="number" value={p} onChange={e => setP(Number(e.target.value))} className="w-full bg-gray-50 p-4 rounded-2xl text-xl font-bold border-2 focus:border-orange-500 outline-none" placeholder="စျေးနှုန်း" />
          <input type="number" value={q} onChange={e => setQ(Number(e.target.value))} className="w-full bg-gray-50 p-4 rounded-2xl text-xl font-bold border-2 focus:border-orange-500 outline-none" placeholder="အရေအတွက်" />
        </div>
        <button onClick={() => onAdd({ productId: product.id, mmName: product.mmName, price: p, quantity: q, unit: product.unit, totalPrice: p * q })} className="w-full mt-8 bg-orange-600 text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3">
          <ShoppingCart size={22} /> စာရင်းထဲထည့်မည်
        </button>
      </div>
    </div>
  );
};