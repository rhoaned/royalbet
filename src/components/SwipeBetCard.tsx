import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { colors, typeScale, spacing, radii, shadows } from '../theme';
import { Match } from '../navigation/types';
import GlassPanel from './GlassPanel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - spacing.lg * 2;
const CARD_HEIGHT = CARD_WIDTH * (4 / 3);

interface SwipeBetCardProps {
  match: Match;
  leftIndicatorOpacity: SharedValue<number>;
  rightIndicatorOpacity: SharedValue<number>;
  superBetIndicatorOpacity: SharedValue<number>;
}

export default function SwipeBetCard({
  match,
  leftIndicatorOpacity,
  rightIndicatorOpacity,
  superBetIndicatorOpacity,
}: SwipeBetCardProps) {
  const skipOverlayStyle = useAnimatedStyle(() => ({
    opacity: leftIndicatorOpacity.value,
  }));

  const betOverlayStyle = useAnimatedStyle(() => ({
    opacity: rightIndicatorOpacity.value,
  }));

  const superBetOverlayStyle = useAnimatedStyle(() => ({
    opacity: superBetIndicatorOpacity.value,
  }));

  return (
    <View style={styles.card}>
      {match.imageUrl && (
        <Image source={{ uri: match.imageUrl }} style={styles.image} />
      )}
      <View style={styles.gradient} />

      {/* Swipe direction indicators */}
      <Animated.View style={[styles.swipeIndicator, styles.skipIndicator, skipOverlayStyle]}>
        <View style={styles.skipStamp}>
          <Text style={styles.skipStampText}>✕</Text>
          <Text style={styles.skipStampLabel}>NEXT BET</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.swipeIndicator, styles.betIndicator, betOverlayStyle]}>
        <View style={styles.betStamp}>
          <Text style={styles.betStampText}>♥</Text>
          <Text style={styles.betStampLabel}>PLACE BET</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.swipeIndicator, styles.superIndicator, superBetOverlayStyle]}>
        <View style={styles.superStamp}>
          <Text style={styles.superStampText}>⭐</Text>
          <Text style={styles.superStampLabel}>SUPER BET</Text>
        </View>
      </Animated.View>

      {/* Instruction Row */}
      <View style={styles.instructionRow}>
        <Text style={styles.instructionLeft}>← SWIPE LEFT TO SKIP</Text>
        <Text style={styles.instructionRight}>SWIPE RIGHT TO BET →</Text>
      </View>

      {/* Live badge & League */}
      <View style={styles.leagueRow}>
        {match.isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>{match.liveStatus || 'LIVE'}</Text>
          </View>
        )}
        <Text style={styles.leagueText}>{match.league}</Text>
      </View>

      {/* Team names */}
      <View style={styles.teamsSection}>
        <Text style={styles.homeTeam}>{match.homeTeam}</Text>
        {match.spread && <Text style={styles.spreadLabel}>/ {match.spread}</Text>}
        <View style={styles.vsDivider}>
          <View style={styles.vsLine} />
          <Text style={styles.vsText}>To Beat</Text>
          <View style={styles.vsLine} />
        </View>
        <Text style={styles.awayTeam}>{match.awayTeam}</Text>
      </View>

      {/* Bottom Glass Panel */}
      <GlassPanel style={styles.statsPanel}>
        <View style={styles.statsPanelContent}>
          <View style={styles.marketInfo}>
            <Text style={styles.marketLabel}>Current Market</Text>
            <Text style={styles.marketValue}>{match.homeTeam} To Win</Text>
          </View>
          <View style={styles.poolInfo}>
            <Text style={styles.poolLabel}>Pool Value</Text>
            <Text style={styles.poolValue}>{match.poolValue}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{match.winProbability}%</Text>
            <Text style={styles.statLabel}>Win Prob</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{match.volume}</Text>
            <Text style={styles.statLabel}>Volume</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: match.sharpSentiment === 'Hot' ? colors.secondaryContainer : colors.onSurfaceVariant }]}>
              {match.sharpSentiment}
            </Text>
            <Text style={styles.statLabel}>Sharp</Text>
          </View>
        </View>
      </GlassPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    ...shadows.card,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.35,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19,19,20,0.5)',
  },
  swipeIndicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  skipIndicator: {},
  betIndicator: {},
  superIndicator: {},
  skipStamp: {
    borderWidth: 3,
    borderColor: colors.outline,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    transform: [{ rotate: '15deg' }],
  },
  skipStampText: {
    fontSize: 36,
    color: colors.outline,
  },
  skipStampLabel: {
    ...typeScale.titleLarge,
    color: colors.outline,
    letterSpacing: 3,
  },
  betStamp: {
    borderWidth: 3,
    borderColor: colors.secondaryContainer,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    transform: [{ rotate: '-15deg' }],
  },
  betStampText: {
    fontSize: 36,
    color: colors.secondaryContainer,
  },
  betStampLabel: {
    ...typeScale.titleLarge,
    color: colors.secondaryContainer,
    letterSpacing: 3,
  },
  superStamp: {
    borderWidth: 3,
    borderColor: colors.primaryContainer,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.1)',
  },
  superStampText: {
    fontSize: 36,
  },
  superStampLabel: {
    ...typeScale.titleLarge,
    color: colors.primaryContainer,
    letterSpacing: 3,
  },
  instructionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  instructionLeft: {
    ...typeScale.labelSmall,
    color: colors.secondaryContainer,
    letterSpacing: 1,
  },
  instructionRight: {
    ...typeScale.labelSmall,
    color: colors.primaryContainer,
    letterSpacing: 1,
  },
  leagueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    position: 'absolute',
    top: 48,
    left: spacing.lg,
    zIndex: 5,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,86,37,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
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
  leagueText: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  teamsSection: {
    position: 'absolute',
    bottom: 180,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 5,
  },
  homeTeam: {
    ...typeScale.displayMedium,
    color: colors.onSurface,
    fontStyle: 'italic',
  },
  spreadLabel: {
    ...typeScale.titleMedium,
    color: colors.onSurfaceVariant,
    marginTop: -4,
  },
  vsDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  vsLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${colors.outlineVariant}40`,
  },
  vsText: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  awayTeam: {
    ...typeScale.headlineLarge,
    color: colors.onSurfaceVariant,
  },
  statsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    zIndex: 5,
  },
  statsPanelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  marketInfo: {},
  marketLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  marketValue: {
    ...typeScale.titleSmall,
    color: colors.primaryContainer,
    marginTop: 2,
  },
  poolInfo: {
    alignItems: 'flex-end',
  },
  poolLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  poolValue: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: `${colors.outlineVariant}30`,
    paddingTop: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typeScale.titleMedium,
    color: colors.primaryContainer,
  },
  statLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
