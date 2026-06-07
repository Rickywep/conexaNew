import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';
import { MOCK_CREDENTIALS } from '../../login/types';

const MOCK_NAME = 'Admin Conexa';

export default function HeaderProfile() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.avatar}>
        <Typography color="#FFFFFF" bold variant="h1">
          {MOCK_NAME.split(' ')
            .map(w => w[0])
            .join('')}
        </Typography>
      </View>
      <Typography bold variant="h3">{MOCK_NAME}</Typography>
      <Typography color={colors.textSecondary} variant="h6">
        {MOCK_CREDENTIALS.email}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
});
