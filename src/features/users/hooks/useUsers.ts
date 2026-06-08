import { useState, useEffect } from 'react';
import type { User } from '../types';
import api from '../../../api';

interface UseUsersResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await api.users.list();
      setUsers(data);
    } catch (err) {
      setError('Error loading data. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { users, isLoading, error };
}
