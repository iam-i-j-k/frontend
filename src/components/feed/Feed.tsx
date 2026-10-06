"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, reorderItems, addRealTimePost } from '@/lib/features/contentSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { ContentCard } from './ContentCard';
import { Reorder, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, searchQuery } = useSelector((state: RootState) => state.content);
  const { categories } = useSelector((state: RootState) => state.preferences);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchContent(categories));
  }, [dispatch, categories]);

  // Real-time Data Implementation via Polling HackerNews API
  useEffect(() => {
    let lastSeenId = 0;
    
    const pollHackerNews = async () => {
      try {
        const res = await fetch('https://hacker-news.firebaseio.com/v0/maxitem.json');
        const currentMaxId = await res.json();
        
        if (lastSeenId === 0) {
          lastSeenId = currentMaxId; // Initialize on first run
          return;
        }

        if (currentMaxId > lastSeenId) {
          // Fetch the newest item
          const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${currentMaxId}.json`);
          const item = await itemRes.json();
          
          if (item && item.type === 'story' && item.title) {
            const newPost = {
              id: `hn-${item.id}`,
              title: item.title,
              description: `Real-time update from HackerNews by ${item.by}`,
              source: 'social' as const,
              category: 'technology',
              url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
              publishedAt: new Date(item.time * 1000).toISOString(),
            };
            
            // Only add if we don't already have it
            if (!items.find(i => i.id === newPost.id)) {
              dispatch(addRealTimePost(newPost));
            }
          }
          lastSeenId = currentMaxId;
        }
      } catch (err) {
        console.error('Failed to poll real-time data');
      }
    };

    pollHackerNews(); // Initial fetch to set lastSeenId
    const interval = setInterval(pollHackerNews, 15000); // Check for new stories every 15 seconds
    
    return () => clearInterval(interval);
  }, [dispatch, items]);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <p>Failed to load content. Please try again later.</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p>{t('no_content')}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{t('feed_title')}</h2>
        <p className="text-gray-500 dark:text-gray-400">{t('feed_subtitle')}</p>
      </div>
      
      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={(newOrder) => dispatch(reorderItems(newOrder))}
        className="flex flex-col gap-6 max-w-4xl mx-auto"
        as="ul"
      >
        <AnimatePresence>
          {filteredItems.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
