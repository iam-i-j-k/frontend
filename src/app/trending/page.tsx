"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ContentCard } from '@/components/feed/ContentCard';
import { TrendingUp } from 'lucide-react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Trending() {
  const { items } = useSelector((state: RootState) => state.content);
  const { t } = useTranslation();
  
  // Just simulate trending by reversing the items or picking a subset
  const trendingItems = [...items].sort((a, b) => b.title.length - a.title.length).slice(0, 4);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
            <TrendingUp className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('trending')}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('trending_subtitle')}</p>
          </div>
        </div>

        {trendingItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-950 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800">
             <p className="text-gray-500">Nothing trending at the moment.</p>
          </div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={trendingItems} 
            onReorder={() => {}} 
            className="flex flex-col gap-6 max-w-4xl mx-auto"
            as="ul"
          >
            <AnimatePresence>
              {trendingItems.map(item => (
                <ContentCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>
    </MainLayout>
  );
}
