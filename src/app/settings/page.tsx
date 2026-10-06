"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleCategory } from '@/lib/features/preferencesSlice';
import { Check, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const AVAILABLE_CATEGORIES = [
  { id: 'technology', label: 'Technology', color: 'bg-blue-500' },
  { id: 'sports', label: 'Sports', color: 'bg-green-500' },
  { id: 'finance', label: 'Finance', color: 'bg-yellow-500' },
  { id: 'entertainment', label: 'Entertainment', color: 'bg-purple-500' },
  { id: 'politics', label: 'Politics', color: 'bg-red-500' },
  { id: 'science', label: 'Science', color: 'bg-teal-500' },
];

export default function Settings() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.preferences);
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <SettingsIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('settings')}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('settings_subtitle')}</p>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-950 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Content Categories</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Select the topics you're interested in to train your personalized algorithm.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {AVAILABLE_CATEGORIES.map((category) => {
              const isSelected = categories.includes(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => dispatch(toggleCategory(category.id))}
                  className={cn(
                    "relative flex items-center p-4 rounded-xl border-2 text-left transition-all overflow-hidden group",
                    isSelected 
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10" 
                      : "border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  )}
                >
                  <div className={cn("w-3 h-12 absolute left-0 top-1/2 -translate-y-1/2 rounded-r-md transition-opacity", category.color, isSelected ? "opacity-100" : "opacity-30 group-hover:opacity-50")} />
                  <span className="font-medium ml-4 flex-1">{category.label}</span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
