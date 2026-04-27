import { X, ShoppingCart } from 'lucide-react';
import { Product, CartLine } from '../types';
import { useRef, useEffect } from 'react';

type Props = {
  product: Product;
  onClose: () => void;
  onAdd: (line: CartLine) => void;
};

export const AddItemSheet = ({ product, onClose, onAdd }: Props) => {
  const priceRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  // Auto focus quantity on open
  useEffect(() => {
    qtyRef.current?.focus();
  }, []);

  const handleAdd = () => {
    if (!priceRef.current || !qtyRef.current) return;

    const p = Number(priceRef.current.value);
    const q = Number(qtyRef.current.value);

    // validation
    if (isNaN(p) || isNaN(q)) return;
    if (q <= 0 || p < 0) return;

    const total = Number((p * q).toFixed(2));

    onAdd({
      productId: product.id,
      mmName: product.mmName,
      price: p,
      quantity: q,
      unit: product.unit,
      totalPrice: total,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-gray-800">
            {product.mmName}
          </h3>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-6">

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="price"
              className="text-xs font-bold text-orange-600 ml-1 uppercase"
            >
              ဈေးနှုန်း
            </label>
            <input
              id="price"
              ref={priceRef}
              type="number"
              inputMode="decimal"
              defaultValue={product.price}
              min="0"
              step="0.01"
              className="w-full bg-gray-50 p-5 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none"
              placeholder="0"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="quantity"
              className="text-xs font-bold text-orange-600 ml-1 uppercase"
            >
              အရေအတွက် ({product.unit})
            </label>
            <input
              id="quantity"
              ref={qtyRef}
              type="number"
              inputMode="decimal"
              defaultValue={1}
              min="0"
              step="0.01"
              className="w-full bg-gray-50 p-5 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-orange-500 outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAdd}
          className="w-full mt-8 bg-orange-600 text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg"
        >
          <ShoppingCart size={22} />
          စာရင်းထဲထည့်မည်
        </button>
      </div>
    </div>
  );
};