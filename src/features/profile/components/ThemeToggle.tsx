import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';

export default function ThemeToggle() {
  const { colors, isDark, toggle } = useTheme();

  return (
    <View
      style={[
        styles.row,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}>
      <Typography>{isDark ? '☀️' : '🌙'}</Typography>
      <Typography>{isDark ? 'Modo claro' : 'Modo oscuro'}</Typography>
      <Switch
        value={isDark}
        onValueChange={toggle}
        trackColor={{ false: colors.border, true: colors.accent }}
        thumbColor={colors.surface}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    height: 46,
    paddingHorizontal: 16,
  },
});
