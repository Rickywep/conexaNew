import React from 'react';
import { Pressable, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Typography from './Typography';
import { useTheme } from '../../theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'contained' | 'outlined';
  color?: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  label,
  onPress,
  variant = 'contained',
  color,
  style,
  loading = false,
  disabled = false,
}: Props) {
  const { colors } = useTheme();

  const resolvedColor = color ?? (variant === 'outlined' ? colors.danger : colors.accent);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        style,
        variant === 'contained' && { backgroundColor: resolvedColor },
        variant === 'outlined' && {
          borderWidth: 1.5,
          borderColor: resolvedColor,
          backgroundColor: pressed ? colors.dangerBg : 'transparent',
        },
        (pressed || loading || disabled) && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={variant === 'outlined' ? resolvedColor : '#FFFFFF'} />
      ) : (
        <Typography
          color={variant === 'outlined' ? resolvedColor : '#FFFFFF'}
          bold
          style={styles.label}>
          {label}
        </Typography>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    fontSize: 16,
  },
});
