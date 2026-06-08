import React from 'react';
import { View, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';
import { Post } from '../types';

const { width } = Dimensions.get('window');

interface Props {
  article: Post;
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
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      android_ripple={{ color: colors.border }}
    >
      <Image
        source={{ uri: article.image }}
        style={[styles.image, { backgroundColor: colors.border }]}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <View style={styles.header}>
          <View
            style={[styles.categoryBadge, { backgroundColor: colors.accentBg }]}
          >
            <Typography color={colors.accent} variant="h7" bold>
              {article.category}
            </Typography>
          </View>
          <Pressable onPress={onToggleFavorite} hitSlop={10}>
            <Typography color={colors.favorite} variant="h2">
              {isFavorite ? '★' : '☆'}
            </Typography>
          </Pressable>
        </View>
        <View style={styles.content}>
          <Typography bold variant="h5" numberOfLines={2}>
            {article.title}
          </Typography>
          <Typography
            color={colors.textSecondary}
            variant="h6"
            numberOfLines={3}
          >
            {article.status}
          </Typography>
          <View style={styles.footer}>
            <Typography color={colors.textTertiary} variant="h7">
              {article.category}
            </Typography>
            <Typography color={colors.textTertiary} variant="h7">
              {article.publishedAt}
            </Typography>
          </View>
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
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    gap: 6,
  },
});
