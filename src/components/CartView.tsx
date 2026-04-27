import { useCart } from '../context/CartContext';
import { Trash2, Printer, ShoppingCart, ArrowLeft } from 'lucide-react';

// We removed useNavigate and react-router-dom to fix your error
export const CartView = ({ onBack }: { onBack?: () => void }) => {
  const { lines = [], removeFromCart, updateQuantity } = useCart();

  const grandTotal = lines.reduce((sum, line) => sum + line.totalPrice, 0);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const itemsHtml = lines.map(line => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 0;">${line.mmName}</td>
        <td style="padding: 12px 0; text-align: center;">${line.quantity} ${line.unit}</td>
        <td style="padding: 12px 0; text-align: right;">${line.price.toLocaleString()}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: bold;">${line.totalPrice.toLocaleString()}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Market Pro+ Shopping List</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 4px solid #ea580c; padding-bottom: 20px; }
            h1 { color: #ea580c; margin: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { border-bottom: 2px solid #1e293b; padding: 10px 0; text-align: left; }
            .total-section { margin-top: 40px; text-align: right; border-top: 2px solid #1e293b; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Market Pro+</h1>
            <p>ဈေးဝယ်စာရင်း (Shopping List)</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ပစ္စည်းအမည်</th>
                <th style="text-align: center;">အရေအတွက်</th>
                <th style="text-align: right;">ဈေးနှုန်း</th>
                <th style="text-align: right;">စုစုပေါင်း</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div class="total-section">
            <h2>စုစုပေါင်း: <span style="color: #ea580c;">${grandTotal.toLocaleString()} ကျပ်</span></h2>
          </div>
          <script>
            window.onload = () => { window.print(); setTimeout(() => { window.close(); }, 100); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 border-b sticky top-0 z-10">
        {onBack && (
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-black text-slate-800">ခြင်းတောင်း</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-40">
        {lines.length > 0 ? (
          <>
            <button 
              onClick={handlePrint}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg mb-2"
            >
              <Printer size={20} strokeWidth={3} />
              PDF ထုတ်မည် (Print)
            </button>

            {lines.map((line) => (
              <div key={line.productId} className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{line.mmName}</h3>
                  <p className="text-orange-600 font-black">{line.price.toLocaleString()} ကျပ်</p>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-2xl border">
                  <button onClick={() => updateQuantity(line.productId, Math.max(1, line.quantity - 1))} className="p-2 bg-white rounded-xl shadow-sm text-slate-400">
                    <MinusIcon />
                  </button>
                  <span className="font-black text-lg w-6 text-center">{line.quantity}</span>
                  <button onClick={() => updateQuantity(line.productId, line.quantity + 1)} className="p-2 bg-white rounded-xl shadow-sm text-slate-400">
                    <PlusIcon />
                  </button>
                </div>

                <button onClick={() => removeFromCart(line.productId)} className="p-3 text-slate-300 hover:text-red-500">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400">
            <ShoppingCart size={48} className="mb-4 opacity-20" />
            <p className="font-bold italic">ခြင်းတောင်းထဲတွင် ပစ္စည်းမရှိသေးပါ</p>
          </div>
        )}
      </div>

      {/* Summary Section */}
      {lines.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20">
          <div className="max-w-md mx-auto flex justify-between items-center px-2">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Total Amount</p>
              <p className="text-2xl font-black text-slate-900">{grandTotal.toLocaleString()} ကျပ်</p>
            </div>
            <button className="bg-orange-600 text-white px-8 py-4 rounded-[2rem] font-black shadow-lg">
              ဝယ်ယူမည်
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icons
const MinusIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const PlusIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;