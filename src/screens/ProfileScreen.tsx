import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typeScale, spacing, radii } from '../theme';
import { userProfile, settledBets, transactions } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const STATS = [
  { label: 'Win Rate', value: `${userProfile.winRate}%` },
  { label: 'Total Bets', value: String(userProfile.totalBets) },
  { label: 'Streak', value: `${userProfile.currentStreak}${userProfile.streakType}` },
  { label: 'ROI', value: `+${userProfile.roi}%` },
];

const MENU_ITEMS = [
  { label: 'Bet History', icon: '📊', badge: `${settledBets.length}` },
  { label: 'Deposit & Withdraw', icon: '💳', badge: undefined },
  { label: 'Transactions', icon: '🧾', badge: `${transactions.length}` },
  { label: 'Notifications', icon: '🔔', badge: '3' },
  { label: 'Preferences', icon: '⚙️', badge: undefined },
  { label: 'Responsible Gaming', icon: '🛡️', badge: undefined },
  { label: 'Help & Support', icon: '💬', badge: undefined },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.xl }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Avatar & Name */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userProfile.displayName.split(' ').map(w => w[0]).join('')}</Text>
        </View>
        <Text style={styles.name}>{userProfile.displayName}</Text>
        <Text style={styles.tier}>{userProfile.tier.toUpperCase()} TIER MEMBER</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
        <Text style={styles.balanceValue}>{formatCurrency(userProfile.balance)}</Text>
        {userProfile.bonusBalance > 0 && (
          <Text style={styles.bonusText}>+ {formatCurrency(userProfile.bonusBalance)} bonus</Text>
        )}
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.depositBtn} activeOpacity={0.8}>
            <Text style={styles.depositBtnText}>DEPOSIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.withdrawBtn} activeOpacity={0.8}>
            <Text style={styles.withdrawBtnText}>WITHDRAW</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {STATS.map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem} activeOpacity={0.8}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <View style={styles.menuRight}>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <Text style={styles.menuChevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing['6xl'],
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primaryContainer,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    ...typeScale.headlineMedium,
    color: colors.primaryContainer,
  },
  name: {
    ...typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: 3,
  },
  tier: {
    ...typeScale.labelSmall,
    color: colors.primaryContainer,
    letterSpacing: 2,
    marginTop: spacing.xs,
  },
  balanceCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: `${colors.primaryContainer}20`,
  },
  balanceLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  balanceValue: {
    ...typeScale.displayMedium,
    color: colors.primaryContainer,
    marginBottom: spacing.xl,
  },
  bonusText: {
    ...typeScale.labelSmall,
    color: colors.secondaryContainer,
    letterSpacing: 1,
    marginBottom: spacing.lg,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  depositBtn: {
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.default,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
  },
  depositBtnText: {
    ...typeScale.labelLarge,
    color: colors.onPrimary,
    letterSpacing: 2,
  },
  withdrawBtn: {
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['2xl'],
  },
  withdrawBtnText: {
    ...typeScale.labelLarge,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typeScale.titleLarge,
    color: colors.primaryContainer,
  },
  statLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
    letterSpacing: 1,
  },
  menu: {
    gap: spacing.xxs,
    marginBottom: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainer,
    padding: spacing.lg,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuLabel: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuBadge: {
    backgroundColor: `${colors.primaryContainer}25`,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  menuBadgeText: {
    ...typeScale.labelSmall,
    color: colors.primaryContainer,
  },
  menuChevron: {
    color: colors.onSurfaceVariant,
    fontSize: 20,
  },
  signOutBtn: {
    borderWidth: 1,
    borderColor: `${colors.error}40`,
    borderRadius: radii.default,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  signOutText: {
    ...typeScale.labelLarge,
    color: colors.error,
    letterSpacing: 2,
  },
});
