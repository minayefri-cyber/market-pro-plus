import { useMemo } from 'react';
import { MASTER_ITEMS } from '../../data/catalog'; // Path ကို သတိထားကြည့်ပါ

export const useMarketStats = (history: any[], period: 'week' | 'month' | 'year') => {
  return useMemo(() => {
    const now = new Date();
    
    const filteredHistory = history.filter((rec: any) => {
      const d = new Date(rec.date);
      if (period === 'week') return (now.getTime() - d.getTime()) <= 7 * 24 * 60 * 60 * 1000;
      if (period === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      if (period === 'year') return d.getFullYear() === now.getFullYear();
      return true;
    });

    const categoryMap: Record<string, number> = {};
    const itemMap: Record<string, { total: number; qty: number; unit: string }> = {};
    let totalSpending = 0;

    filteredHistory.forEach((rec: any) => {
      rec.items.forEach((it: any) => {
        // (m: any) လို့ ပြင်ထားပါတယ်
        const category = MASTER_ITEMS.find((m: any) => it.mmName.includes(m.mm))?.cat || 'အထွေထွေ';
        categoryMap[category] = (categoryMap[category] || 0) + it.totalPrice;
        
        if (!itemMap[it.mmName]) {
          itemMap[it.mmName] = { total: 0, qty: 0, unit: it.unit };
        }
        itemMap[it.mmName].total += it.totalPrice;
        itemMap[it.mmName].qty += it.quantity;
        totalSpending += it.totalPrice;
      });
    });

    const sortedItems = Object.entries(itemMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.total - a.total);

    const sortedCategories = Object.entries(categoryMap)
      .map(([category, total]) => ({
        category,
        total,
        percentage: totalSpending > 0 ? Math.round((total / totalSpending) * 100) : 0
      }))
      .sort((a, b) => b.total - a.total);

    return { categoryData: sortedCategories, allItemData: sortedItems, periodTotal: totalSpending };
  }, [history, period]);
};