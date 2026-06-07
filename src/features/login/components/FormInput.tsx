import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Typography from '../../../components/shared/Typography';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function FormInput({ label, error, style, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <Typography style={styles.label}>{label}</Typography>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        {...rest}
      />
      {error ? <Typography style={styles.error}>{error}</Typography> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});
