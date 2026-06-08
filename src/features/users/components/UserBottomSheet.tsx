import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Pressable,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useTheme } from '../../../theme';
import { User } from '../types';

interface Props {
  user: User | null;
  onClose: () => void;
}

const SHEET_HEIGHT = 400;

export default function UserBottomSheet({ user, onClose }: Props) {
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const [snapshot, setSnapshot] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setSnapshot(user);
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [user, slideAnim]);

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: SHEET_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setSnapshot(null);
      onClose();
    });
  };

  if (!snapshot) return null;

  return (
    <Modal
      visible
      transparent
      animationType="none"
      onRequestClose={close}
      statusBarTranslucent>
      <Pressable style={styles.overlay} onPress={close} />
      <Animated.View
        style={[
          styles.sheet,
          { backgroundColor: colors.surface },
          { transform: [{ translateY: slideAnim }] },
        ]}>
        <View style={[styles.handle, { backgroundColor: colors.border }]} />

        <Image
          source={{ uri: `https://i.pravatar.cc/150?img=${snapshot.id}` }}
          style={[styles.avatar, { backgroundColor: colors.border }]}
          resizeMode="cover"
        />

        <Typography bold variant="h3" style={styles.name}>
          {snapshot.firstname} {snapshot.lastname}
        </Typography>


        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.row}>
          <Typography>✉</Typography>
          <Typography color={colors.textSecondary} variant="h6">
            {snapshot.email}
          </Typography>
        </View>

        <View style={styles.row}>
          <Typography>📞</Typography>
          <Typography color={colors.textSecondary} variant="h6">
            {snapshot.phone}
          </Typography>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 14,
  },
  name: {
    marginBottom: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 10,
    marginBottom: 12,
  },
});
