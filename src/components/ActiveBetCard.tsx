import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typeScale, spacing, radii } from '../theme';
import { ActiveBet, BetStatus } from '../navigation/types';
import { formatCurrency } from '../utils/formatters';

interface ActiveBetCardProps {
  bet: ActiveBet;
  onDetails?: () => void;
  onCashOut?: () => void;
}

const STATUS_CONFIG: Record<BetStatus, { label: string; color: string; borderColor: string }> = {
  winning: {
    label: 'Winning',
    color: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  in_progress: {
    label: 'In Progress',
    color: colors.tertiaryFixedDim,
    borderColor: colors.tertiaryFixedDim,
  },
  losing: {
    label: 'Losing',
    color: colors.secondaryContainer,
    borderColor: `${colors.secondaryContainer}66`,
  },
  almost_done: {
    label: 'Almost Done',
    color: colors.tertiaryContainer,
    borderColor: colors.tertiaryContainer,
  },
};

export default function ActiveBetCard({ bet, onDetails, onCashOut }: ActiveBetCardProps) {
  const config = STATUS_CONFIG[bet.status];

  return (
    <View style={[styles.card, { borderLeftColor: config.borderColor }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.matchTitle}>
            {bet.match.homeTeam} vs {bet.match.awayTeam}
          </Text>
          <Text style={styles.league}>
            {bet.match.league}
            {bet.match.isLive && ` • ${bet.match.liveStatus}`}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${config.color}20` }]}>
          <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Stake</Text>
          <Text style={styles.statValue}>{formatCurrency(bet.stake)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Odds</Text>
          <Text style={styles.statValue}>{bet.odds}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Payout</Text>
          <Text style={[styles.statValue, { color: colors.primaryContainer }]}>
            {formatCurrency(bet.potentialPayout)}
          </Text>
        </View>
      </View>

      {bet.parlayLegs && (
        <View style={styles.parlayRow}>
          <Text style={styles.parlayText}>
            {bet.parlayWon}/{bet.parlayLegs} Legs Won
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity onPress={onDetails} style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>Details</Text>
        </TouchableOpacity>
        {bet.cashOutValue && (
          <TouchableOpacity onPress={onCashOut} style={styles.cashOutBtn}>
            <Text style={styles.cashOutBtnText}>
              Cash Out {formatCurrency(bet.cashOutValue)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderLeftWidth: 4,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  matchTitle: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
  },
  league: {
    ...typeScale.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.lg,
  },
  statusText: {
    ...typeScale.labelSmall,
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  stat: {},
  statLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
    marginTop: 2,
  },
  parlayRow: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: `${colors.outlineVariant}30`,
  },
  parlayText: {
    ...typeScale.bodySmall,
    color: colors.tertiaryFixedDim,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  detailsBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.default,
    backgroundColor: colors.surfaceContainerHigh,
  },
  detailsBtnText: {
    ...typeScale.labelMedium,
    color: colors.onSurface,
  },
  cashOutBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.default,
    backgroundColor: `${colors.primaryContainer}20`,
  },
  cashOutBtnText: {
    ...typeScale.labelMedium,
    color: colors.primaryContainer,
  },
});
