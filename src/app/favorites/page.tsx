"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ContentCard } from '@/components/feed/ContentCard';
import { Heart } from 'lucide-react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Favorites() {
  const { items, favorites } = useSelector((state: RootState) => state.content);
  const { t } = useTranslation();
  
  const favoriteItems = items.filter(item => favorites.includes(item.id));

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('favorites')}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('favorites_subtitle')}</p>
          </div>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-950 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800">
            <Heart className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No favorites yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Click the heart icon on any article to save it here.</p>
          </div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={favoriteItems} 
            onReorder={() => {}} // Could dispatch a reorder favorite action if desired
            className="flex flex-col gap-6 max-w-4xl mx-auto"
            as="ul"
          >
            <AnimatePresence>
              {favoriteItems.map(item => (
                <ContentCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>
    </MainLayout>
  );
}
