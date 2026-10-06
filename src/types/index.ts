export interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  source: 'news' | 'recommendation' | 'social';
  category: string;
  url: string;
  publishedAt: string;
  isFavorite?: boolean;
}

export interface UserPreferences {
  categories: string[];
  theme: 'light' | 'dark' | 'system';
}
