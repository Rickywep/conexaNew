import { renderHook, waitFor } from '@testing-library/react-native';
import { useUsers } from '../hooks/useUsers';
import api from '../../../api';

jest.mock('../../../api', () => ({
  users: { list: jest.fn() },
}));

const mockedList = api.users.list as jest.Mock;

const MOCK_USERS = [
  { id: '1', firstname: 'John', lastname: 'Doe', email: 'john@example.com', phone: '555-0001', birthDate: '1990-01-01', login: {} as any, address: {} as any, website: '', company: { name: 'ACME', catchPhrase: '', bs: 'Developer' } },
  { id: '2', firstname: 'Jane', lastname: 'Smith', email: 'jane@example.com', phone: '555-0002', birthDate: '1992-05-10', login: {} as any, address: {} as any, website: '', company: { name: 'Corp', catchPhrase: '', bs: 'Designer' } },
];

beforeEach(() => jest.clearAllMocks());

describe('useUsers', () => {
  it('inicia con users vacio y sin error', () => {
    mockedList.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useUsers());
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('carga los usuarios correctamente', async () => {
    mockedList.mockResolvedValue(MOCK_USERS);
    const { result } = renderHook(() => useUsers());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.users).toHaveLength(2);
    expect(result.current.users[0].firstname).toBe('John');
  });

  it('setea error cuando la API falla', async () => {
    mockedList.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useUsers());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).not.toBeNull();
  });

  it('error es null cuando la carga es exitosa', async () => {
    mockedList.mockResolvedValue(MOCK_USERS);
    const { result } = renderHook(() => useUsers());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBeNull();
  });
});
