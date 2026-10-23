import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'gold' | 'crimson';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  toggleTheme: () => void;
  themeConfig: {
    name: string;
    icon: string;
    primaryHex: string;
    accentHex: string;
    creamBgHex: string;
    navAnnouncementBg: string;
    btnClass: string;
    btnSecondaryClass: string;
    badgeClass: string;
    priceClass: string;
    activeTabClass: string;
    borderClass: string;
    cardBgClass: string;
    heroGradient: string;
  };
}

const THEME_CONFIGS: Record<AppTheme, ThemeContextType['themeConfig']> = {
  gold: {
    name: 'Yellow & White',
    icon: '🟡',
    primaryHex: '#F59E0B',
    accentHex: '#D97706',
    creamBgHex: '#FCFCFA',
    navAnnouncementBg: 'bg-[#B45309]',
    btnClass: 'bg-amber-500 hover:bg-amber-600 text-stone-950 font-black shadow-md shadow-amber-200/80',
    btnSecondaryClass: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80',
    badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black',
    priceClass: 'text-amber-700',
    activeTabClass: 'bg-amber-500 text-stone-950 font-black shadow-sm',
    borderClass: 'border-amber-200/80',
    cardBgClass: 'bg-[#FFFDF7]',
    heroGradient: 'from-[#FEF3C7] via-[#FFFBEB] to-[#FDE68A]',
  },
  crimson: {
    name: 'Cream & Red',
    icon: '🔴',
    primaryHex: '#DC2626',
    accentHex: '#991B1B',
    creamBgHex: '#FFFDF9',
    navAnnouncementBg: 'bg-[#991B1B]',
    btnClass: 'bg-red-600 hover:bg-red-700 text-white font-black shadow-md shadow-red-200/80',
    btnSecondaryClass: 'bg-red-50 hover:bg-red-100 text-red-900 border border-red-200/80',
    badgeClass: 'bg-gradient-to-r from-red-600 to-rose-500 text-white font-black',
    priceClass: 'text-red-600',
    activeTabClass: 'bg-red-600 text-white font-black shadow-sm',
    borderClass: 'border-red-200/80',
    cardBgClass: 'bg-[#FFFBF5]',
    heroGradient: 'from-[#FFF1F2] via-[#FFFBF5] to-[#FEE2E2]',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blossom_theme') as AppTheme;
      if (saved === 'gold' || saved === 'crimson') return saved;
    }
    return 'gold';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blossom_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'gold' ? 'crimson' : 'gold');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    themeConfig: THEME_CONFIGS[theme],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
