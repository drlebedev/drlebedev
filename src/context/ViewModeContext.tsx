import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type ViewMode = 'editorial' | 'terminal';
export type ThemeMode = 'system' | 'light' | 'dark';

export interface ViewModeContextType {
  activeMode: ViewMode;
  setActiveMode: (mode: ViewMode) => void;
  toggleMode: () => void;
  activeTheme: ThemeMode;
  setActiveTheme: (theme: ThemeMode) => void;
  isDark: boolean;
}

const STORAGE_MODE_KEY = 'drlebedev_view_mode';
const STORAGE_THEME_KEY = 'drlebedev_theme';

export const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export interface ViewModeProviderProps {
  children: React.ReactNode;
  initialMode?: ViewMode;
  initialTheme?: ThemeMode;
}

export const ViewModeProvider: React.FC<ViewModeProviderProps> = ({
  children,
  initialMode,
  initialTheme,
}) => {
  const [activeMode, setActiveModeState] = useState<ViewMode>(() => {
    if (initialMode) return initialMode;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(STORAGE_MODE_KEY);
        if (saved === 'editorial' || saved === 'terminal') {
          return saved;
        }
      } catch (err) {
        console.warn('Could not read view mode from localStorage', err);
      }
    }
    return 'editorial';
  });

  const [activeTheme, setActiveThemeState] = useState<ThemeMode>(() => {
    if (initialTheme) return initialTheme;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(STORAGE_THEME_KEY);
        if (saved === 'system' || saved === 'light' || saved === 'dark') {
          return saved;
        }
      } catch (err) {
        console.warn('Could not read theme from localStorage', err);
      }
    }
    return 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch {
        return true;
      }
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setSystemPrefersDark(e.matches);
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } catch {
      // ignore
    }
  }, []);

  const isDark = useMemo(() => {
    if (activeTheme === 'dark') return true;
    if (activeTheme === 'light') return false;
    return systemPrefersDark;
  }, [activeTheme, systemPrefersDark]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDark]);

  const setActiveMode = (mode: ViewMode) => {
    setActiveModeState(mode);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(STORAGE_MODE_KEY, mode);
      } catch (err) {
        console.warn('Could not save view mode to localStorage', err);
      }
    }
  };

  const toggleMode = () => {
    setActiveMode(activeMode === 'editorial' ? 'terminal' : 'editorial');
  };

  const setActiveTheme = (theme: ThemeMode) => {
    setActiveThemeState(theme);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(STORAGE_THEME_KEY, theme);
      } catch (err) {
        console.warn('Could not save theme to localStorage', err);
      }
    }
  };

  const value = useMemo(
    () => ({
      activeMode,
      setActiveMode,
      toggleMode,
      activeTheme,
      setActiveTheme,
      isDark,
    }),
    [activeMode, activeTheme, isDark]
  );

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
};

export const useViewMode = (): ViewModeContextType => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};
