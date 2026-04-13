import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typeScale, spacing, radii } from '../theme';
import { activeBets, userProfile } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import ActiveBetCard from '../components/ActiveBetCard';

export default function ActiveBetsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header with gradient feel */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.headerRow}>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <Text style={styles.headerTitle}>ROYAL REWARD</Text>
          <View style={styles.balancePill}>
            <Text style={styles.balanceText}>{formatCurrency(userProfile.balance)}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>Active Bets</Text>
            <Text style={styles.subtitle}>
              Tracking {activeBets.length} live positions
            </Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <Text style={styles.filterIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* Bet Cards */}
        <View style={styles.betsList}>
          {activeBets.map((bet) => (
            <ActiveBetCard
              key={bet.id}
              bet={bet}
              onDetails={() => {}}
              onCashOut={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surfaceContainerLow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typeScale.labelMedium,
    color: colors.primaryContainer,
  },
  headerTitle: {
    ...typeScale.titleLarge,
    color: colors.primaryContainer,
    fontStyle: 'italic',
    letterSpacing: 3,
  },
  balancePill: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  balanceText: {
    ...typeScale.labelMedium,
    color: colors.primaryContainer,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing['6xl'],
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  title: {
    ...typeScale.headlineMedium,
    color: colors.onSurface,
  },
  subtitle: {
    ...typeScale.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    color: colors.primaryContainer,
    fontSize: 18,
  },
  betsList: {
    gap: spacing.md,
  },
});
