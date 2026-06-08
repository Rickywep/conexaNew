export type { NewsStackParamList } from '../features/news/types';
import type { NewsStackParamList } from '../features/news/types';

import { NavigatorScreenParams } from '@react-navigation/native';

export interface AppState {
  isAuthenticated: boolean;
}

export type AppAction =
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
