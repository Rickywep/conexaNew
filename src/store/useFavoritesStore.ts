import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id: string) => {
        const { favorites } = get();
        const next = favorites.includes(id)
          ? favorites.filter(f => f !== id)
          : [...favorites, id];
        set({ favorites: next });
      },

      isFavorite: (id: string) => get().favorites.includes(id),
    }),
    {
      name: '@conexanews_favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
