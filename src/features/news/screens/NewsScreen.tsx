import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Typography from '../../../components/shared/Typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Post, NewsStackParamList } from '../types';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import { useTheme } from '../../../theme';
import NewsCard from '../components/NewsCard';
import HeaderNews from '../components/HeaderNews';
import SearchBar from '../../../components/SearchBar';
import { useNews } from '../hooks/useNews';

type Nav = NativeStackNavigationProp<NewsStackParamList, 'NewsList'>;

interface Props {
  navigation: Nav;
}

export default function NewsScreen({ navigation }: Props) {
  const { filtered, isLoading, error, searchQuery, setSearchQuery } = useNews();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: Post }) => (
    <NewsCard
      article={item}
      isFavorite={isFavorite(item.id.toString())}
      onPress={() => navigation.navigate('Detail', { article: item })}
      onToggleFavorite={() => toggleFavorite(item.id.toString())}
    />
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />
      <HeaderNews />
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Typography color={colors.textTertiary} variant="h5">
            {error}
          </Typography>
        </View>
      ) : (
        <>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          <FlashList
            data={filtered}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Typography color={colors.textTertiary} variant="h5">
                  Sin resultados para "{searchQuery}"
                </Typography>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
