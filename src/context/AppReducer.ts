import { AppState, AppAction } from '../types';

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      const isFav = state.favorites.includes(id);
      return {
        ...state,
        favorites: isFav
          ? state.favorites.filter(f => f !== id)
          : [...state.favorites, id],
      };
    }

    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };

    default:
      return state;
  }
}
