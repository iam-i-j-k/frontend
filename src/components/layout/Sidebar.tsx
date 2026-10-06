"use client";

import Link from 'next/link';
import { Home, TrendingUp, Heart, Settings, Rss } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-redux'; // Wait, it's from react-i18next!
import { useTranslation as useTranslationI18n } from 'react-i18next';

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslationI18n();

  const links = [
    { href: '/', label: t('my_feed'), icon: Home },
    { href: '/trending', label: t('trending'), icon: TrendingUp },
    { href: '/favorites', label: t('favorites'), icon: Heart },
    { href: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col hidden md:flex sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Rss className="w-6 h-6 text-blue-600" />
          <span>Personify</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl text-white shadow-lg">
          <h4 className="font-semibold mb-1">{t('upgrade_pro')}</h4>
          <p className="text-xs opacity-90 mb-3">{t('upgrade_desc')}</p>
          <button 
            onClick={() => alert("Pro plan upgrade flow coming soon!")}
            className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
          >
            {t('learn_more')}
          </button>
        </div>
      </div>
    </aside>
  );
}
