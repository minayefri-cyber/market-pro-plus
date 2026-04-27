import React from 'react';
import { useCart } from '../context/CartContext';
import { Send, Clock, Calendar } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { lines, clearCart } = useCart();
  const total = lines.reduce((sum, line) => sum + line.totalPrice, 0);

  // Date and Time logic
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleShareViber = () => {
    if (lines.length === 0) return;
    
    let message = `🛒 *ဝယ်ယူမည့်စာရင်း*\n`;
    message += `📅 ရက်စွဲ: ${formattedDate} (${formattedTime})\n`;
    message += `--------------------------\n`;
    lines.forEach((line, index) => {
      // Added Sr.No to the Viber message too!
      message += `${index + 1}. ${line.mmName} (${line.quantity} ${line.unit}) - ${line.totalPrice.toLocaleString()} ကျပ်\n`;
    });
    message += `--------------------------\n`;
    message += `💰 *စုစုပေါင်း: ${total.toLocaleString()} ကျပ်*`;
    
    window.location.href = `viber://forward?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="p-4 pb-32 max-w-md mx-auto">
      <h2 className="text-2xl font-black text-gray-800 mb-6">စာရင်းအတည်ပြုရန်</h2>

      <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-100 mb-6 font-sans">
        
        {/* --- Date & Time Header --- */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-dashed border-gray-200">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <span className="text-[11px] font-bold">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={14} />
            <span className="text-[11px] font-bold">{formattedTime}</span>
          </div>
        </div>

        {/* --- Sr.No & Table Header --- */}
        <div className="flex text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
          <span className="w-8">စဉ်</span>
          <span className="flex-1 text-center">အမျိုးအမည်</span>
          <span className="w-20 text-right">ဈေးနှုန်း</span>
        </div>

        {/* --- Items List with Sr.No --- */}
        <div className="space-y-3">
          {lines.map((line, index) => (
            <div key={line.productId} className="flex items-start py-1 group">
              {/* 1. Sr.No Column */}
              <span className="w-8 text-xs font-bold text-gray-300 mt-1">
                {String(index + 1).padStart(2, '0')}.
              </span>
              
              {/* 2. Item Name & Details */}
              <div className="flex-1">
                <p className="font-bold text-gray-800 leading-tight">{line.mmName}</p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {line.quantity} {line.unit} x {Number(line.price).toLocaleString()}
                </p>
              </div>

              {/* 3. Total Price Column */}
              <span className="w-24 text-right font-black text-gray-900 text-sm">
                {line.totalPrice.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* --- Grand Total Section --- */}
        <div className="mt-6 pt-6 border-t-4 border-double border-gray-900 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase block">Total Amount</span>
            <span className="font-black text-gray-900">စုစုပေါင်း</span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-orange-600">
              {total.toLocaleString()}
            </span>
            <span className="text-xs font-black text-orange-600 ml-1">ကျပ်</span>
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <button 
        onClick={handleShareViber} 
        className="w-full bg-[#7360f2] text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
      >
        <Send size={24} /> Viber သို့ ပို့မည်
      </button>

      <button 
        onClick={clearCart} 
        className="w-full mt-6 text-gray-400 font-bold py-2 hover:text-red-500 transition-colors"
      >
        စာရင်းအသစ်ပြန်စမည်
      </button>
    </div>
  );
};