import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '@/types';

const initialState: UserPreferences = {
  categories: ['technology', 'sports'],
  theme: 'system',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleCategory, setTheme } = preferencesSlice.actions;
export default preferencesSlice.reducer;
