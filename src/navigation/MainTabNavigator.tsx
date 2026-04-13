import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from './types';
import { colors, typeScale, spacing } from '../theme';
import BettingDeckScreen from '../screens/BettingDeckScreen';
import MarketHubScreen from '../screens/MarketHubScreen';
import ActiveBetsScreen from '../screens/ActiveBetsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Deck: '★',
  Markets: '◎',
  Activity: '◈',
  Profile: '●',
};

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerLow,
          borderTopWidth: 0,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: spacing.sm,
        },
        tabBarActiveTintColor: colors.primaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontFamily: typeScale.labelSmall.fontFamily,
          fontSize: 10,
          letterSpacing: 1,
          textTransform: 'uppercase',
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => (
          <View style={focused ? styles.activeIconWrap : undefined}>
            <Text style={[styles.tabIcon, { color }]}>
              {TAB_ICONS[route.name]}
            </Text>
          </View>
        ),
      })}
    >
      <Tab.Screen name="Deck" component={BettingDeckScreen} />
      <Tab.Screen name="Markets" component={MarketHubScreen} />
      <Tab.Screen name="Activity" component={ActiveBetsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
  },
  activeIconWrap: {
    backgroundColor: `${colors.primaryContainer}15`,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
});
