import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '../types';

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: user.avatar }}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.role}>{user.role}</Text>
        <View style={styles.detail}>
          <Text style={styles.label}>✉ </Text>
          <Text style={styles.value} numberOfLines={1}>
            {user.email}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>📞 </Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  role: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
    marginBottom: 6,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
  },
});
