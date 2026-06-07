import { useThemeStore } from '../store/useThemeStore';

export interface Colors {
  background: string;
  input: string;
  surface: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  accent: string;
  accentBg: string;
  danger: string;
  dangerBg: string;
  dangerBorder: string;
  favorite: string;
  statusBar: 'dark-content' | 'light-content';
}

export const lightColors: Colors = {
  background: '#F9FAFB',
  input: '#F3F4F6',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  accent: '#4F46E5',
  accentBg: '#EEF2FF',
  danger: '#EF4444',
  dangerBg: '#FEF2F2',
  dangerBorder: '#FECACA',
  favorite: '#F59E0B',
  statusBar: 'dark-content',
};

export const darkColors: Colors = {
  background: '#111827',
  input: '#1F2937',
  surface: '#1F2937',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  border: '#374151',
  accent: '#818CF8',
  accentBg: '#1E1B4B',
  danger: '#F87171',
  dangerBg: '#450A0A',
  dangerBorder: '#991B1B',
  favorite: '#FCD34D',
  statusBar: 'light-content',
};

export function useTheme() {
  const { isDark, toggle } = useThemeStore();
  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
    toggle,
  };
}
