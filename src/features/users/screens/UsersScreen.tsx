import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useAppContext } from '../../../context/AppContext';
import UserCard from '../components/UserCard';
import { User } from '../types';

export default function UsersScreen() {
  const { state } = useAppContext();

  const renderItem = ({ item }: { item: User }) => <UserCard user={item} />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.headerBar}>
        <Typography style={styles.title}>Equipo</Typography>
        <Typography style={styles.count}>{state.users.length} personas</Typography>
      </View>
      <FlatList
        data={state.users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  count: {
    fontSize: 13,
    color: '#6B7280',
  },
  list: {
    paddingVertical: 10,
    paddingBottom: 24,
  },
});
