import { AppState, AppAction } from '../types';

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };

    case 'LOGOUT':
      return { ...state, isAuthenticated: false };

    case 'LOAD_AUTH':
      return { ...state, isAuthenticated: action.payload };

    default:
      return state;
  }
}
