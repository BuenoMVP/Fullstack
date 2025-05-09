import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt');

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'pt' ? 'en' : 'pt');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}


