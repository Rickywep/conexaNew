import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAppContext } from '../../../context/AppContext';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import { TabParamList } from '../../../types';
import type { Article } from '../../news/types';
import { MOCK_CREDENTIALS } from '../../login/types';

type Nav = BottomTabNavigationProp<TabParamList, 'Profile'>;

const MOCK_NAME = 'Admin Conexa';

export default function ProfileScreen() {
  const { state, dispatch } = useAppContext();
  const { favorites } = useFavoritesStore();
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
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={() =>
        navigation.navigate('News', {
          screen: 'Detail',
          params: { article: item },
        })
      }>
      <Text style={styles.itemTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.itemChevron}>›</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.headerBar}>
        <Text style={styles.screenTitle}>Perfil</Text>
      </View>

      <FlatList
        data={favoriteArticles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>
                  {MOCK_NAME.split(' ')
                    .map(w => w[0])
                    .join('')}
                </Text>
              </View>
              <Text style={styles.name}>{MOCK_NAME}</Text>
              <Text style={styles.email}>{MOCK_CREDENTIALS.email}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.logoutBtn,
                pressed && styles.logoutBtnPressed,
              ]}
              onPress={handleLogout}>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </Pressable>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Noticias favoritas</Text>
              <Text style={styles.sectionCount}>
                {favoriteArticles.length}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>☆</Text>
            <Text style={styles.emptyText}>Todavía no tenés favoritos</Text>
            <Text style={styles.emptyHint}>
              Tocá la estrella en cualquier noticia para guardarla acá
            </Text>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  list: {
    paddingBottom: 32,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutBtn: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderRadius: 12,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnPressed: {
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  sectionCount: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    fontWeight: '500',
    color: '#1F2937',
    lineHeight: 20,
    marginRight: 8,
  },
  itemChevron: {
    fontSize: 22,
    color: '#9CA3AF',
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
    color: '#D1D5DB',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});
