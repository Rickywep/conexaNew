import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'| 'h7';

interface Props extends TextProps {
  variant?: Variant;
  bold?: boolean;
  color?: string;
  children: React.ReactNode;
}

const FONT_SIZES: Record<Variant, number> = {
  h1: 32,
  h2: 26,
  h3: 22,
  h4: 18,
  h5: 16,
  h6: 14,
  h7: 12,
};

export default function Typography({
  variant = 'h4',
  bold = false,
  color,
  style,
  children,
  ...rest
}: Props) {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        styles.base,
        { fontSize: FONT_SIZES[variant] },
        bold && styles.bold,
        style,
        { color: color ?? colors.text },
      ]}
      {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
});
