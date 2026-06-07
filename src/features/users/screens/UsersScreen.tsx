import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../theme';
import UserCard from '../components/UserCard';
import HeaderUsers from '../components/HeaderUsers';
import UserBottomSheet from '../components/UserBottomSheet';
import { User } from '../types';

export default function UsersScreen() {
  const { state } = useAppContext();
  const { colors } = useTheme();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const renderItem = ({ item }: { item: User }) => (
    <UserCard user={item} onPress={() => setSelectedUser(item)} />
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />
      <HeaderUsers />
      <FlatList
        data={state.users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <UserBottomSheet
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  list: {
    paddingVertical: 10,
    paddingBottom: 24,
  },
});
