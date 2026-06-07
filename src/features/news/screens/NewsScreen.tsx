import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Typography from '../../../components/shared/Typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Article, NewsStackParamList } from '../types';
import { useAppContext } from '../../../context/AppContext';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import { useTheme } from '../../../theme';
import NewsCard from '../components/NewsCard';
import HeaderNews from '../components/HeaderNews';
import SearchBar from '../../../components/SearchBar';

type Nav = NativeStackNavigationProp<NewsStackParamList, 'NewsList'>;

interface Props {
  navigation: Nav;
}

export default function NewsScreen({ navigation }: Props) {
  const { state, dispatch } = useAppContext();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { colors } = useTheme();

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
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />
      <HeaderNews />
      <SearchBar value={state.searchQuery} onChangeText={handleSearch} />
      <FlashList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Typography color={colors.textTertiary} variant='h5'>
              Sin resultados para "{state.searchQuery}"
            </Typography>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    alignItems: 'center',
  },
});
