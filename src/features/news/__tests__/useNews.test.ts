import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useNews } from '../hooks/useNews';
import api from '../../../api';

jest.mock('../../../api', () => ({
  news: { list: jest.fn() },
}));

const mockedList = api.news.list as jest.Mock;

const MOCK_POSTS = [
  { id: 1, title: 'Post A', content: 'Contenido de A', image: '', category: 'lorem', publishedAt: '', updatedAt: '', slug: '', url: '', thumbnail: '', status: 'published', userId: 1 },
  { id: 2, title: 'Post B', content: 'Contenido de B', image: '', category: 'lorem', publishedAt: '', updatedAt: '', slug: '', url: '', thumbnail: '', status: 'published', userId: 2 },
];

beforeEach(() => jest.clearAllMocks());

describe('useNews', () => {
  it('inicia con articles vacio y sin error', () => {
    mockedList.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useNews());
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('carga los articulos correctamente', async () => {
    mockedList.mockResolvedValue({ data: MOCK_POSTS });
    const { result } = renderHook(() => useNews());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.articles).toHaveLength(2);
    expect(result.current.articles[0].title).toBe('Post A');
  });

  it('setea error cuando la API falla', async () => {
    mockedList.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useNews());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).not.toBeNull();
  });

  it('filtered devuelve todos los articulos si searchQuery esta vacio', async () => {
    mockedList.mockResolvedValue({ data: MOCK_POSTS });
    const { result } = renderHook(() => useNews());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.filtered).toHaveLength(2);
  });

  it('filtered filtra por titulo', async () => {
    mockedList.mockResolvedValue({ data: MOCK_POSTS });
    const { result } = renderHook(() => useNews());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.setSearchQuery('Post A'); });
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].title).toBe('Post A');
  });

  it('filtered filtra por contenido', async () => {
    mockedList.mockResolvedValue({ data: MOCK_POSTS });
    const { result } = renderHook(() => useNews());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.setSearchQuery('Contenido de B'); });
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].id).toBe(2);
  });

  it('filtered es case-insensitive', async () => {
    mockedList.mockResolvedValue({ data: MOCK_POSTS });
    const { result } = renderHook(() => useNews());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => { result.current.setSearchQuery('post a'); });
    expect(result.current.filtered).toHaveLength(1);
  });
});
