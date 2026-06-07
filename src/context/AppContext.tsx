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
const AUTH_KEY = '@conexanews_auth';

const initialState: AppState = {
  articles: articlesData as Article[],
  users: usersData as User[],
  favorites: [],
  searchQuery: '',
  isAuthenticated: false,
};

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  isFavorite: (id: string) => boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carga el estado persistido al iniciar
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(FAVORITES_KEY),
      AsyncStorage.getItem(AUTH_KEY),
    ]).then(([favRaw, authRaw]) => {
      if (favRaw) {
        dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(favRaw) });
      }
      if (authRaw) {
        dispatch({ type: 'LOAD_AUTH', payload: JSON.parse(authRaw) });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    AsyncStorage.setItem(AUTH_KEY, JSON.stringify(state.isAuthenticated));
  }, [state.isAuthenticated]);

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
