import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// hook pro tema global
export const useTheme = () => useContext(ThemeContext); // acede ctx do tema
