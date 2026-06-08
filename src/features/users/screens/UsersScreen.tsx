import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from '../../../theme';
import UserCard from '../components/UserCard';
import HeaderUsers from '../components/HeaderUsers';
import UserBottomSheet from '../components/UserBottomSheet';
import Typography from '../../../components/shared/Typography';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types';

export default function UsersScreen() {
  const { users, isLoading, error } = useUsers();
  const { colors } = useTheme();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const renderItem = ({ item }: { item: User }) => (
    <UserCard user={item} onPress={() => setSelectedUser(item)} />
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />
      <HeaderUsers count={users.length} />
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Typography color={colors.textTertiary} variant="h5">
            {error}
          </Typography>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
