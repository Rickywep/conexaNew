export type { Article } from '../features/news/types';
import type { Article } from '../features/news/types';

export type { User } from '../features/users/types';
import type { User } from '../features/users/types';

export type { NewsStackParamList } from '../features/news/types';
import type { NewsStackParamList } from '../features/news/types';

import { NavigatorScreenParams } from '@react-navigation/native';

export interface AppState {
  articles: Article[];
  users: User[];
  favorites: string[];
  searchQuery: string;
  isAuthenticated: boolean;
}

export type AppAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: string[] }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_AUTH'; payload: boolean };

export type RootStackParamList = {
  Tabs: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type TabParamList = {
  News: NavigatorScreenParams<NewsStackParamList> | undefined;
  Users: undefined;
  Profile: undefined;
};
