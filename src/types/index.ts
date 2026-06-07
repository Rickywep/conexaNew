export type { Article } from '../features/news/types';
import type { Article } from '../features/news/types';

export type { User } from '../features/users/types';
import type { User } from '../features/users/types';

export interface AppState {
  articles: Article[];
  users: User[];
  favorites: string[];
  searchQuery: string;
}

export type AppAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: string[] };

export type RootStackParamList = {
  Tabs: undefined;
  Detail: { article: Article };
};

export type TabParamList = {
  News: undefined;
  Users: undefined;
};
