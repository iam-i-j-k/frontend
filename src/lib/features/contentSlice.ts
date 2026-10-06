import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '@/types';
import axios from 'axios';

interface ContentState {
  items: ContentItem[];
  favorites: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
}

const initialState: ContentState = {
  items: [],
  favorites: [],
  status: 'idle',
  error: null,
  searchQuery: '',
};

// Mock async thunk to fetch content
// In a real app, this would call actual APIs like NewsAPI, TMDB, etc.
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (categories: string[]) => {
    let newsData: ContentItem[] = [];
    
    // Try to fetch from real NewsAPI if key is provided
    if (process.env.NEXT_PUBLIC_NEWS_API_KEY) {
      try {
        const query = categories.length > 0 ? categories.join(' OR ') : 'technology OR sports OR entertainment';
        const res = await axios.get(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=10`);
        newsData = res.data.articles.map((article: any, index: number) => ({
          id: `news-${index}-${Date.now()}`,
          title: article.title,
          description: article.description,
          source: 'news',
          category: categories[0],
          url: article.url,
          publishedAt: article.publishedAt,
          imageUrl: article.urlToImage,
        }));
      } catch (err) {
        console.error("NewsAPI failed, falling back to mock");
      }
    }

    let tmdbData: ContentItem[] = [];
    if (process.env.NEXT_PUBLIC_TMDB_API_KEY && (categories.length === 0 || categories.includes('entertainment'))) {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        tmdbData = res.data.results.slice(0, 4).map((movie: any) => ({
          id: `tmdb-${movie.id}`,
          title: movie.title || movie.name,
          description: movie.overview,
          source: 'recommendation',
          category: 'entertainment',
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          publishedAt: movie.release_date || new Date().toISOString(),
          imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
        }));
      } catch (err) {
        console.error("TMDB API failed");
      }
    }

    const mockData: ContentItem[] = [
      {
        id: '4',
        title: 'Just released my new portfolio!',
        description: 'Check out my latest projects and designs on my new website. #webdev #design',
        source: 'social',
        category: 'technology',
        url: '#',
        publishedAt: new Date().toISOString(),
      }
    ];
    
    let combinedData = [...newsData, ...tmdbData, ...mockData];

    // Filter by categories
    if (categories.length > 0) {
      combinedData = combinedData.filter(item => categories.includes(item.category) || item.source === 'recommendation' || item.source === 'social');
    }
    return combinedData;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((fId) => fId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    reorderItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    addRealTimePost: (state, action: PayloadAction<ContentItem>) => {
      // Simulate real-time SSE / WebSocket data coming in
      state.items = [action.payload, ...state.items];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch content';
      });
  },
});

export const { toggleFavorite, setSearchQuery, reorderItems, addRealTimePost } = contentSlice.actions;
export default contentSlice.reducer;
