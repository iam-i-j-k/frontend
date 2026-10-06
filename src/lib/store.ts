import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
import preferencesReducer from './features/preferencesSlice';
import contentReducer from './features/contentSlice';


const simplePersistConfig = {
  key: 'preferences',
  storage,
};

const rootReducerWithGranularPersist = combineReducers({
  preferences: persistReducer(simplePersistConfig, preferencesReducer),
  content: contentReducer, // We'll re-fetch content, but we could persist favorites if we moved them to a separate slice or nested persist.
});

export const store = configureStore({
  reducer: rootReducerWithGranularPersist,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
