import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import Typography from './shared/Typography';
import { useTheme } from '../theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.input }]}>
      <Typography color={colors.textTertiary} style={styles.icon}>🔍</Typography>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? 'Buscar noticias...'}
        placeholderTextColor={colors.textTertiary}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <Typography color={colors.textTertiary} style={styles.clear}>✕</Typography>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    height: 44,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  clear: {
    fontSize: 14,
    paddingLeft: 8,
  },
});
