import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppState, AppAction } from '../types';
import type { Article } from '../features/news/types';
import type { User } from '../features/users/types';
import { appReducer } from './AppReducer';
import articlesData from '../data/news.json';
import usersData from '../data/users.json';

const FAVORITES_KEY = '@conexanews_favorites';

const initialState: AppState = {
  articles: articlesData as Article[],
  users: usersData as User[],
  favorites: [],
  searchQuery: '',
};

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  isFavorite: (id: string) => boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY).then(raw => {
      if (raw) {
        dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(raw) });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  }, [state.favorites]);

  const isFavorite = (id: string) => state.favorites.includes(id);

  return (
    <AppContext.Provider value={{ state, dispatch, isFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
