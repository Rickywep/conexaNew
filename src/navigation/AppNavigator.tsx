import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList, AuthStackParamList, TabParamList } from '../types';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../theme';

import LoginScreen from '../features/login/screens/LoginScreen';
import NewsStack from '../features/news';
import UsersScreen from '../features/users/screens/UsersScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import Typography from '../components/shared/Typography';

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
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
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
            News: 'N',
            Users: 'U',
            Profile: 'P',
          };
          return (
            <Typography
              variant="h3"
              color={focused ? colors.accent : colors.textSecondary}
            >
              {icons[route.name] ?? '•'}
            </Typography>
          );
        },
      })}
    >
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
