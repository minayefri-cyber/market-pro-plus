import React, { createContext, useContext, ReactNode } from 'react';
import { t as translateFunc } from './translations';

interface I18nContextType {
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <I18nContext.Provider value={{ t: translateFunc }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const context = useContext(I18nContext);
  return context || { t: translateFunc };
}