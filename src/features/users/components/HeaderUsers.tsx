import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';
import { useAppContext } from '../../../context/AppContext';

export default function HeaderUsers() {
  const { colors } = useTheme();
  const { state } = useAppContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}>
      <Typography bold variant='h3'>Equipo</Typography>
      <Typography color={colors.textSecondary} variant='h7'>
        {state.users.length} personas
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
    paddingBottom: 12,
  },
});
