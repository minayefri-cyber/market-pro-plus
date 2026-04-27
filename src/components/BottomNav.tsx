import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { AppTab } from '@/types';
import { LayoutGrid, ShoppingCart, ReceiptText } from 'lucide-react';

interface BottomNavProps {
  active: AppTab;
  onChange: (tab: AppTab) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange, cartCount }) => {
  const { t } = useI18n();

  const navItems = [
    { id: 'catalog', label: 'ဈေးဝယ်ရန်', icon: LayoutGrid },
    { id: 'cart', label: 'ခြင်းတောင်း', icon: ShoppingCart, badge: cartCount },
    { id: 'checkout', label: 'ရှင်းမည်', icon: ReceiptText },
  ];

  return (
    // z-10 လို့ ပြောင်းထားတဲ့အတွက် Pop-up (z-[100]) ရဲ့ အောက်မှာပဲ ရှိနေမှာပါ
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id as AppTab)}
              className={`relative flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-orange-600' : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-orange-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};