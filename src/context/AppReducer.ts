import { AppState, AppAction } from '../types';

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'LOGIN':
      return { ...state, isAuthenticated: true };

    case 'LOGOUT':
      return { ...state, isAuthenticated: false, searchQuery: '' };

    case 'LOAD_AUTH':
      return { ...state, isAuthenticated: action.payload };

    default:
      return state;
  }
}
