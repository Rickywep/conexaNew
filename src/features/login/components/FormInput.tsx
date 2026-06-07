import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function FormInput({ label, error, style, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Typography bold variant="h7">
        {label}
      </Typography>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.input,
            color: colors.text,
          },
          error
            ? { borderColor: colors.danger, backgroundColor: colors.dangerBg }
            : null,
          style,
        ]}
        placeholderTextColor={colors.textTertiary}
        autoCapitalize="none"
        {...rest}
      />
      {error ? (
        <Typography color={colors.danger} variant="h7">
          {error}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    gap: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
  },
});
