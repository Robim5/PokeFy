import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContextValue';

// hook para langue global
export const useLanguage = () => useContext(LanguageContext); // ganha contexto de idioma
