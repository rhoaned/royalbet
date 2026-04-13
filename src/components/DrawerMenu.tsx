import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typeScale, spacing, radii } from '../theme';
import { drawerNavItems } from '../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

interface DrawerMenuProps {
  isOpen: SharedValue<number>;
  onClose: () => void;
  balance?: string;
}

export default function DrawerMenu({ isOpen, onClose, balance = '$12,450.00' }: DrawerMenuProps) {
  const insets = useSafeAreaInsets();

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(isOpen.value, [0, 1], [-DRAWER_WIDTH, 0]) },
    ],
  }));

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: isOpen.value * 0.5,
    pointerEvents: isOpen.value > 0.1 ? 'auto' as const : 'none' as const,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.scrim, scrimStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.drawer, drawerStyle, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>THE VAULT</Text>
          <View style={styles.goldRule} />
        </View>

        {/* Nav Items */}
        <View style={styles.navItems}>
          {drawerNavItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.navItem, item.isActive && styles.navItemActive]}
              activeOpacity={0.8}
            >
              <View style={styles.navItemLeft}>
                <Text style={[styles.navIcon, item.isActive && styles.navIconActive]}>
                  {item.label === 'Sports' ? '🏆' :
                   item.label === 'Racing' ? '🏁' :
                   item.label === 'Bet Live' ? '⚡' :
                   item.label === 'Black Book' ? '📖' : '💰'}
                </Text>
                <Text style={[styles.navLabel, item.isActive && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </View>
              {item.hasLiveDot && <View style={styles.liveDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>CURRENT BALANCE</Text>
          <Text style={styles.balanceValue}>{balance}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    zIndex: 50,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: colors.surfaceContainerLow,
    zIndex: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
    justifyContent: 'space-between',
  },
  drawerHeader: {
    paddingTop: spacing['3xl'],
    marginBottom: spacing['2xl'],
  },
  drawerTitle: {
    ...typeScale.headlineMedium,
    color: colors.primaryContainer,
    letterSpacing: 4,
  },
  goldRule: {
    height: 2,
    backgroundColor: colors.primaryContainer,
    marginTop: spacing.md,
    width: 48,
  },
  navItems: {
    flex: 1,
    gap: spacing.xs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.xl,
  },
  navItemActive: {
    backgroundColor: colors.primaryContainer,
  },
  navItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  navIcon: {
    fontSize: 20,
  },
  navIconActive: {},
  navLabel: {
    ...typeScale.titleMedium,
    color: colors.onSurface,
  },
  navLabelActive: {
    color: colors.onPrimary,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondaryContainer,
  },
  balanceCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}30`,
  },
  balanceLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  balanceValue: {
    ...typeScale.headlineLarge,
    color: colors.primaryContainer,
  },
});
