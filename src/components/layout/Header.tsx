"use client";

import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/lib/features/contentSlice';
import { RootState } from '@/lib/store';
import { useCallback, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

export function Header() {
  const dispatch = useDispatch();
  const currentQuery = useSelector((state: RootState) => state.content.searchQuery);
  const [localQuery, setLocalQuery] = useState(currentQuery);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 500);

    return () => clearTimeout(handler);
  }, [localQuery, dispatch]);

  return (
    <header className="h-20 px-6 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => alert("Mobile menu toggle functionality coming soon!")}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
          />
        </div>
      </div>
      
        <div className="flex items-center gap-2">
          {mounted && (
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-sm text-gray-500 font-medium cursor-pointer focus:outline-none"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          )}

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          
          <button 
            onClick={() => alert("No new notifications")}
            className="p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-950"></span>
          </button>
          
          {session ? (
            <button 
              onClick={() => signOut()}
              title="Sign Out"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-[2px] transition-transform hover:scale-105"
            >
              <div className="w-full h-full rounded-full border-2 border-white dark:border-gray-950 overflow-hidden bg-white dark:bg-gray-900 flex items-center justify-center font-bold text-xs">
                {session.user?.name?.charAt(0) || 'U'}
              </div>
            </button>
          ) : (
            <button 
              onClick={() => signIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {t('login')}
            </button>
          )}
        </div>
    </header>
  );
}
