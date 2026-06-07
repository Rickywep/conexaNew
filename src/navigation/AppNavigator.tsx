import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList, TabParamList } from '../types';
import NewsScreen from '../features/news/screens/NewsScreen';
import DetailScreen from '../features/news/screens/DetailScreen';
import UsersScreen from '../features/users/screens/UsersScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = {
            News: focused ? '📰' : '🗞️',
            Users: focused ? '👥' : '👤',
          };
          return (
            <Text style={{ fontSize: 22 }}>{icons[route.name] ?? '•'}</Text>
          );
        },
      })}>
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ tabBarLabel: 'Noticias' }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{ tabBarLabel: 'Equipo' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
