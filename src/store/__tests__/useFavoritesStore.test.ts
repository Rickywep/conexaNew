import { act, renderHook } from '@testing-library/react-hooks';
import { useFavoritesStore } from '../useFavoritesStore';

// Reinicia el store entre tests para evitar contaminacion
beforeEach(() => {
  useFavoritesStore.setState({ favorites: [] });
});

describe('useFavoritesStore', () => {
  it('arranca con lista de favoritos vacia', () => {
    const { result } = renderHook(() => useFavoritesStore());
    expect(result.current.favorites).toEqual([]);
  });

  it('toggleFavorite agrega un id que no existia', () => {
    const { result } = renderHook(() => useFavoritesStore());
    act(() => { result.current.toggleFavorite('1'); });
    expect(result.current.favorites).toContain('1');
  });

  it('toggleFavorite elimina un id que ya existia', () => {
    useFavoritesStore.setState({ favorites: ['1', '2'] });
    const { result } = renderHook(() => useFavoritesStore());
    act(() => { result.current.toggleFavorite('1'); });
    expect(result.current.favorites).not.toContain('1');
    expect(result.current.favorites).toContain('2');
  });

  it('isFavorite retorna true si el id esta en la lista', () => {
    useFavoritesStore.setState({ favorites: ['42'] });
    const { result } = renderHook(() => useFavoritesStore());
    expect(result.current.isFavorite('42')).toBe(true);
  });

  it('isFavorite retorna false si el id no esta en la lista', () => {
    const { result } = renderHook(() => useFavoritesStore());
    expect(result.current.isFavorite('99')).toBe(false);
  });

  it('no duplica ids si se llama toggleFavorite dos veces con el mismo id', () => {
    const { result } = renderHook(() => useFavoritesStore());
    act(() => { result.current.toggleFavorite('5'); });
    act(() => { result.current.toggleFavorite('5'); });
    expect(result.current.favorites.filter(f => f === '5')).toHaveLength(0);
  });
});
