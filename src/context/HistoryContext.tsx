import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext<any>(null);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('market_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addRecord = (items: any[], total: number, customer: string) => {
    const newRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      items,
      total,
      customer
    };
    const updated = [newRecord, ...history];
    setHistory(updated);
    localStorage.setItem('market_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('market_history');
  };

  // မှတ်တမ်းကို တစ်ခုချင်းစီ ရွေးဖျက်ရန် function အသစ်
  const deleteRecord = (id: number | string) => {
    const updated = history.filter((rec) => rec.id !== id);
    setHistory(updated);
    localStorage.setItem('market_history', JSON.stringify(updated));
  };

  return (
    // အောက်ပါ Provider value တွင် setHistory နှင့် deleteRecord ကိုပါ ထည့်သွင်းထားပါသည်
    <HistoryContext.Provider value={{ history, addRecord, clearHistory, deleteRecord, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);