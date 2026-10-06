"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { Feed } from '@/components/feed/Feed';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="space-y-8 pb-12">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('welcome')}</h1>
            <p className="text-blue-100 text-lg">{t('description')}</p>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        {/* Main Feed */}
        <Feed />
      </div>
    </MainLayout>
  );
}
