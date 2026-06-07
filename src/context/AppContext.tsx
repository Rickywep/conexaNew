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

const AUTH_KEY = '@conexanews_auth';

const initialState: AppState = {
  articles: articlesData as Article[],
  users: usersData as User[],
  searchQuery: '',
  isAuthenticated: false,
};

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem(AUTH_KEY).then(raw => {
      if (raw) {
        dispatch({ type: 'LOAD_AUTH', payload: JSON.parse(raw) });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(AUTH_KEY, JSON.stringify(state.isAuthenticated));
  }, [state.isAuthenticated]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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
