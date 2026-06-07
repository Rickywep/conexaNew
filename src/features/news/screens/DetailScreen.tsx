import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewsStackParamList } from '../types';
import { useAppContext } from '../../../context/AppContext';

type Props = NativeStackScreenProps<NewsStackParamList, 'Detail'>;

const { width } = Dimensions.get('window');

export default function DetailScreen({ navigation, route }: Props) {
  const { article } = route.params;
  const { dispatch, isFavorite } = useAppContext();
  const fav = isFavorite(article.id);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Pressable
            style={styles.favBtn}
            onPress={() =>
              dispatch({ type: 'TOGGLE_FAVORITE', payload: article.id })
            }>
            <Text style={styles.favIcon}>{fav ? '★' : '☆'}</Text>
          </Pressable>
        </View>

        <View style={styles.body}>
          <View style={styles.meta}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{article.category}</Text>
            </View>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          </View>

          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.authorRow}>
            <Text style={styles.authorLabel}>Por </Text>
            <Text style={styles.authorName}>{article.author}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.articleContent}>{article.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 26,
    color: '#FFFFFF',
    lineHeight: 30,
    marginTop: -2,
  },
  favBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {
    fontSize: 22,
    color: '#F59E0B',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#EEF2FF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 30,
    marginBottom: 12,
  },
  authorRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  authorLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  authorName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
    marginBottom: 20,
  },
  articleContent: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 26,
  },
});
