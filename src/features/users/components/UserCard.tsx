import React from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';
import { User } from '../types';

interface Props {
  user: User;
  onPress: () => void;
}

export default function UserCard({ user, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <Image
        source={{ uri: user.avatar }}
        style={[styles.avatar, { backgroundColor: colors.border }]}
        resizeMode="cover"
      />
      <Typography bold variant="h5" style={styles.name}>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography color={colors.textTertiary} style={styles.chevron}>›</Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  pressed: {
    opacity: 0.6,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  name: {
    flex: 1,
  },
  chevron: {
    fontSize: 22,
  },
});
