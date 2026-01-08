import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { LanguageContext } from './LanguageContextValue';

export const LanguageProvider = ({ children }) => {
  // provider de idioma
  // estado do idioma atual
  const [language, setLanguage] = useState('pt');

  // traduz chave
  const t = (key) => {
    return translations[language][key] || key; // fallback para a chave
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
