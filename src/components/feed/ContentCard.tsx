"use client";

import { ContentItem } from '@/types';
import { motion, Reorder } from 'framer-motion';
import { Heart, Share2, ExternalLink, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/lib/features/contentSlice';
import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ContentCardProps {
  item: ContentItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const favorites = useSelector((state: RootState) => state.content.favorites);
  const isFavorite = favorites.includes(item.id);

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'news': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'recommendation': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'social': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <Reorder.Item 
      value={item} 
      id={item.id}
      whileDrag={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 cursor-grab active:cursor-grabbing flex flex-col sm:flex-row h-full min-h-[12rem]"
    >
      {item.imageUrl && (
        <div className="relative w-full sm:w-1/3 h-48 sm:h-auto shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 sm:from-black/40 sm:to-transparent to-transparent z-10" />
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className={cn("absolute top-3 left-3 sm:right-3 sm:left-auto z-20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md", getSourceColor(item.source))}>
            {item.category}
          </span>
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-1">
        {!item.imageUrl && (
           <span className={cn("inline-block w-max mb-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", getSourceColor(item.source))}>
             {item.category}
           </span>
        )}
        
        <h3 className="font-bold text-xl sm:text-2xl mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center text-xs text-gray-400 gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                dispatch(toggleFavorite(item.id));
              }}
              title="Toggle Favorite"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigator.clipboard.writeText(window.location.origin + item.url);
                alert("Link copied to clipboard!");
              }}
              title="Share"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(item.url, "_blank");
              }}
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ml-2"
            >
              {item.source === 'recommendation' ? t('play_now') : t('read_more')}
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
}
