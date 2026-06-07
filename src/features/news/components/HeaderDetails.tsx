import React from 'react';
import { View, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';
import { useFavoritesStore } from '../../../store/useFavoritesStore';

interface Props {
  imageUrl: string;
  articleId: string;
  onBack: () => void;
}

const { width } = Dimensions.get('window');

export default function HeaderDetails({ imageUrl, articleId, onBack }: Props) {
  const { colors } = useTheme();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const fav = isFavorite(articleId);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { backgroundColor: colors.border }]}
        resizeMode="cover"
      />
      <Pressable style={styles.backBtn} onPress={onBack}>
        <Typography color="#FFFFFF" style={styles.backIcon}>‹</Typography>
      </Pressable>
      <Pressable style={styles.favBtn} onPress={() => toggleFavorite(articleId)}>
        <Typography color={colors.favorite} variant="h3">
          {fav ? '★' : '☆'}
        </Typography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width * 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
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
});
