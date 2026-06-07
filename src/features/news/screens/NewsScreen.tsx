import React, { useMemo } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Article, NewsStackParamList } from '../types';
import { useAppContext } from '../../../context/AppContext';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import NewsCard from '../components/NewsCard';
import SearchBar from '../../../components/SearchBar';

type Nav = NativeStackNavigationProp<NewsStackParamList, 'NewsList'>;

interface Props {
  navigation: Nav;
}

export default function NewsScreen({ navigation }: Props) {
  const { state, dispatch } = useAppContext();
  const { favorites, isFavorite, toggleFavorite } = useFavoritesStore();

  const filtered = useMemo(() => {
    const q = state.searchQuery.toLowerCase().trim();
    if (!q) return state.articles;
    return state.articles.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q),
    );
  }, [state.articles, state.searchQuery]);

  const handleSearch = (text: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: text });
  };

  const renderItem = ({ item }: { item: Article }) => (
    <NewsCard
      article={item}
      isFavorite={isFavorite(item.id)}
      onPress={() => navigation.navigate('Detail', { article: item })}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.headerBar}>
        <Text style={styles.brand}>Conexa News</Text>
        <Text style={styles.favCount}>
          ★ {favorites.length}
        </Text>
      </View>
      <SearchBar value={state.searchQuery} onChangeText={handleSearch} />
      {state.searchQuery.length > 0 && (
        <Text style={styles.resultCount}>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </Text>
      )}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Sin resultados para "{state.searchQuery}"</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  favCount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F59E0B',
  },
  resultCount: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 16,
    marginBottom: 4,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
  },
});
