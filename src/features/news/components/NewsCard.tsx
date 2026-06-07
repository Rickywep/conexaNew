import React from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Typography from '../../../components/shared/Typography';
import { Article } from '../types';

const { width } = Dimensions.get('window');

interface Props {
  article: Article;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export default function NewsCard({
  article,
  isFavorite,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
      android_ripple={{ color: '#E5E7EB' }}>
      <Image
        source={{ uri: article.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.categoryBadge}>
            <Typography style={styles.categoryText}>{article.category}</Typography>
          </View>
          <Pressable onPress={onToggleFavorite} hitSlop={10}>
            <Typography style={styles.favIcon}>{isFavorite ? '★' : '☆'}</Typography>
          </Pressable>
        </View>
        <Typography style={styles.title} numberOfLines={2}>
          {article.title}
        </Typography>
        <Typography style={styles.content} numberOfLines={3}>
          {article.summary}
        </Typography>
        <View style={styles.footer}>
          <Typography style={styles.author}>{article.author}</Typography>
          <Typography style={styles.date}>{formatDate(article.publishedAt)}</Typography>
        </View>
      </View>
    </Pressable>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  image: {
    width: '100%',
    height: width * 0.45,
    backgroundColor: '#E5E7EB',
  },
  body: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#EEF2FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '600',
  },
  favIcon: {
    fontSize: 22,
    color: '#F59E0B',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 22,
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
