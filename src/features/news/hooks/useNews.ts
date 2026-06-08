import { useState, useEffect, useMemo } from 'react';
import type { Post } from '../types';
import api from '../../../api';

interface UseNewsResult {
  articles: Post[];
  filtered: Post[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function useNews(): UseNewsResult {
  const [articles, setArticles] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await api.news.list();
      setArticles(data.data);
    } catch (err) {
      setError('Error loading data. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return articles;
    return articles.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) 
    );
  }, [articles, searchQuery]);

  return { articles, filtered, isLoading, error, searchQuery, setSearchQuery };
}
