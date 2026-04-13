import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typeScale, spacing, radii, shadows } from '../theme';
import { RootStackParamList } from '../navigation/types';
import { deckMatches, sampleSlipSelections } from '../data/mockData';
import { formatCurrency, calculateCombinedOdds } from '../utils/formatters';
import GlassPanel from '../components/GlassPanel';

type RouteType = RouteProp<RootStackParamList, 'BetSlip'>;

const QUICK_STAKES = [10, 50, 100];

export default function BetSlipScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteType>();
  const insets = useSafeAreaInsets();
  const [stake, setStake] = useState(100);

  const match = deckMatches.find((m) => m.id === route.params.matchId) ?? deckMatches[0];

  const combinedOdds = useMemo(
    () => calculateCombinedOdds(sampleSlipSelections),
    [],
  );
  const toReturn = stake * combinedOdds;
  const netProfit = toReturn - stake;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KINETIC</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Live Match Hero */}
        <View style={styles.matchHero}>
          <View style={styles.heroTeams}>
            <View style={styles.heroTeam}>
              <Text style={styles.heroTeamLabel}>HOME</Text>
              <Text style={styles.heroTeamName}>{match.homeTeam}</Text>
            </View>
            {match.isLive && (
              <View style={styles.heroScoreWrap}>
                <Text style={styles.heroScore}>
                  {match.homeScore ?? 0} — {match.awayScore ?? 0}
                </Text>
                <View style={styles.livePill}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>{match.liveStatus}</Text>
                </View>
              </View>
            )}
            <View style={[styles.heroTeam, { alignItems: 'flex-end' }]}>
              <Text style={styles.heroTeamLabel}>AWAY</Text>
              <Text style={styles.heroTeamName}>{match.awayTeam}</Text>
            </View>
          </View>
        </View>

        {/* Win Probability */}
        {match.winProbability && (
          <View style={styles.probSection}>
            <Text style={styles.probTitle}>WIN PROBABILITY</Text>
            <Text style={styles.probValue}>{match.winProbability}%</Text>
            <View style={styles.probBar}>
              <View
                style={[styles.probFill, { width: `${match.winProbability}%`, backgroundColor: colors.primaryContainer }]}
              />
              <View
                style={[styles.probFill, { width: '10%', backgroundColor: colors.onSurfaceVariant }]}
              />
              <View
                style={[styles.probFill, { flex: 1, backgroundColor: colors.secondaryContainer }]}
              />
            </View>
          </View>
        )}

        {/* Build Slip */}
        <View style={styles.slipSection}>
          <View style={styles.slipHeader}>
            <Text style={styles.slipTitle}>BUILD YOUR SLIP</Text>
            <View style={styles.selectionsBadge}>
              <Text style={styles.selectionsBadgeText}>
                {sampleSlipSelections.length} SELECTIONS
              </Text>
            </View>
          </View>

          {sampleSlipSelections.map((sel) => (
            <View key={sel.id} style={styles.selectionRow}>
              <View>
                <Text style={styles.selMarket}>{sel.market}</Text>
                <Text style={styles.selPick}>{sel.selection}</Text>
              </View>
              <Text style={styles.selOdds}>{sel.odds.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Stake */}
        <View style={styles.stakeSection}>
          <Text style={styles.stakeLabel}>STAKE AMOUNT</Text>
          <Text style={styles.stakeValue}>{formatCurrency(stake)}</Text>

          <View style={styles.quickStakes}>
            {QUICK_STAKES.map((qs) => (
              <TouchableOpacity
                key={qs}
                style={styles.quickStakeBtn}
                onPress={() => setStake((s) => s + qs)}
              >
                <Text style={styles.quickStakeText}>+${qs}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.quickStakeBtn, { backgroundColor: colors.surfaceContainerHighest }]}
              onPress={() => setStake(500)}
            >
              <Text style={styles.quickStakeText}>MAX</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Returns */}
        <GlassPanel style={styles.returnsPanel}>
          <View style={styles.returnRow}>
            <Text style={styles.returnLabel}>TO RETURN</Text>
            <Text style={styles.returnValue}>{formatCurrency(toReturn)}</Text>
          </View>
          <View style={styles.returnRow}>
            <Text style={styles.returnLabel}>NET PROFIT</Text>
            <Text style={[styles.returnValue, { color: colors.primaryContainer }]}>
              {formatCurrency(netProfit)}
            </Text>
          </View>
        </GlassPanel>
      </ScrollView>

      {/* Place Bet CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <TouchableOpacity
          style={styles.placeBetBtn}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.placeBetText}>⚡ PLACE BET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  closeIcon: {
    color: colors.onSurfaceVariant,
    fontSize: 20,
  },
  headerTitle: {
    ...typeScale.titleLarge,
    color: colors.primaryContainer,
    fontStyle: 'italic',
    letterSpacing: 3,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  matchHero: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    padding: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondaryContainer,
    marginBottom: spacing.xl,
  },
  heroTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTeam: {},
  heroTeamLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  heroTeamName: {
    ...typeScale.titleLarge,
    color: colors.onSurface,
  },
  heroScoreWrap: {
    alignItems: 'center',
  },
  heroScore: {
    ...typeScale.headlineLarge,
    color: colors.onSurface,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${colors.secondaryContainer}20`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: spacing.xs,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondaryContainer,
  },
  liveText: {
    ...typeScale.labelSmall,
    color: colors.secondaryContainer,
    letterSpacing: 1,
  },
  probSection: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  probTitle: {
    ...typeScale.labelMedium,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  probValue: {
    ...typeScale.headlineLarge,
    color: colors.primaryContainer,
    marginBottom: spacing.md,
  },
  probBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    gap: 2,
  },
  probFill: {
    height: '100%',
    borderRadius: 3,
  },
  slipSection: {
    marginBottom: spacing.xl,
  },
  slipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  slipTitle: {
    ...typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: 1,
  },
  selectionsBadge: {
    backgroundColor: `${colors.primaryContainer}20`,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  selectionsBadgeText: {
    ...typeScale.labelSmall,
    color: colors.primaryContainer,
    letterSpacing: 1,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    padding: spacing.lg,
    marginBottom: spacing.xs,
  },
  selMarket: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  selPick: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
    marginTop: 2,
  },
  selOdds: {
    ...typeScale.oddsDisplay,
    color: colors.primaryContainer,
  },
  stakeSection: {
    marginBottom: spacing.xl,
  },
  stakeLabel: {
    ...typeScale.labelMedium,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  stakeValue: {
    ...typeScale.headlineLarge,
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  quickStakes: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickStakeBtn: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  quickStakeText: {
    ...typeScale.labelMedium,
    color: colors.onSurface,
  },
  returnsPanel: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  returnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  returnLabel: {
    ...typeScale.labelMedium,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
  },
  returnValue: {
    ...typeScale.titleLarge,
    color: colors.onSurface,
  },
  ctaWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: `${colors.outlineVariant}20`,
  },
  placeBetBtn: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: radii.default,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    ...shadows.cta,
    shadowColor: colors.secondaryContainer,
  },
  placeBetText: {
    ...typeScale.titleLarge,
    color: '#FFFFFF',
    letterSpacing: 3,
  },
});
