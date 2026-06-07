import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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
};

export default function Typography({
  variant = 'h4',
  bold = false,
  color = '#000',
  style,
  children,
  ...rest
}: Props) {
  return (
    <Text
      style={[
        styles.base,
        { fontSize: FONT_SIZES[variant], color },
        bold && styles.bold,
        style,
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
