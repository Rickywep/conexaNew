import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAppContext } from '../../../context/AppContext';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import { useTheme } from '../../../theme';
import { TabParamList } from '../../../types';
import type { Article } from '../../news/types';
import HeaderProfile from '../components/HeaderProfile';
import Button from '../../../components/shared/Button';
import ThemeToggle from '../components/ThemeToggle';

type Nav = BottomTabNavigationProp<TabParamList, 'Profile'>;

export default function ProfileScreen() {
  const { state, dispatch } = useAppContext();
  const { favorites } = useFavoritesStore();
  const { colors } = useTheme();
  const navigation = useNavigation<Nav>();

  const favoriteArticles = useMemo(
    () => state.articles.filter(a => favorites.includes(a.id)),
    [state.articles, favorites],
  );

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const renderItem = ({ item }: { item: Article }) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: colors.surface },
        pressed && styles.itemPressed,
      ]}
      onPress={() =>
        navigation.navigate('News', {
          screen: 'Detail',
          params: { article: item },
        })
      }
    >
      <Typography style={styles.itemTitle} numberOfLines={2}>
        {item.title}
      </Typography>
      <Typography color={colors.textTertiary} style={styles.itemChevron}>
        ›
      </Typography>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />

      <View
        style={[
          styles.headerBar,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Typography bold variant="h3">
          Perfil
        </Typography>
      </View>

      <HeaderProfile />

      <ThemeToggle />

      <Button
        variant="outlined"
        label="Cerrar sesión"
        onPress={handleLogout}
        style={styles.logout}
      />
      <FlatList
        data={favoriteArticles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Typography bold variant='h5'>
              Noticias favoritas
            </Typography>
            <Typography
              color={colors.textSecondary}
              variant='h5'
              bold
            >
              {favoriteArticles.length}
            </Typography>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Typography bold variant='h5'>
              Todavía no tenés favoritos
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  list: {
    paddingBottom: 32,
  },
  logout: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  itemPressed: {
    opacity: 0.7,
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    marginRight: 8,
  },
  itemChevron: {
    fontSize: 22,
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 24,
  },
});
