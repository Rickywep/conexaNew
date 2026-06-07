import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList, AuthStackParamList, TabParamList } from '../types';
import { useAppContext } from '../context/AppContext';

import LoginScreen from '../features/login/screens/LoginScreen';
import NewsStack from '../features/news';
import UsersScreen from '../features/users/screens/UsersScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

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
            Profile: focused ? '👤' : '🔘',
          };
          return (
            <Text style={{ fontSize: 22 }}>{icons[route.name] ?? '•'}</Text>
          );
        },
      })}>
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{ tabBarLabel: 'Noticias' }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{ tabBarLabel: 'Equipo' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Tabs" component={TabNavigator} />
    </MainStack.Navigator>
  );
}

export default function AppNavigator() {
  const { state } = useAppContext();

  return (
    <NavigationContainer>
      {state.isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
