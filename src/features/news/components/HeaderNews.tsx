import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';
import { useFavoritesStore } from '../../../store/useFavoritesStore';

export default function HeaderNews() {
  const { colors } = useTheme();
  const { favorites } = useFavoritesStore();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}>
      <Typography bold variant='h3'>Conexa News</Typography>
      <Typography color={colors.favorite} bold variant='h5'>
        ★ {favorites.length}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
