import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typeScale, spacing } from '../theme';
import { Match } from '../navigation/types';
import OddsChip from './OddsChip';

interface MatchRowProps {
  match: Match;
  onPress?: () => void;
}

export default function MatchRow({ match, onPress }: MatchRowProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.row}>
      <View style={styles.matchInfo}>
        <View style={styles.teamRow}>
          <Text style={styles.teamName}>{match.homeTeam}</Text>
          {match.isLive && match.homeScore !== undefined && (
            <Text style={styles.score}>{match.homeScore}</Text>
          )}
        </View>
        <View style={styles.teamRow}>
          <Text style={styles.teamName}>{match.awayTeam}</Text>
          {match.isLive && match.awayScore !== undefined && (
            <Text style={styles.score}>{match.awayScore}</Text>
          )}
        </View>
        {match.isLive && (
          <View style={styles.liveRow}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>{match.liveStatus}</Text>
          </View>
        )}
      </View>
      <View style={styles.oddsRow}>
        <OddsChip label="1" odds={match.homeOdds} isLive={match.isLive} />
        <OddsChip label="X" odds="Draw" />
        <OddsChip label="2" odds={match.awayOdds} isLive={match.isLive} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surfaceContainer,
    gap: spacing.md,
  },
  matchInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamName: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
  },
  score: {
    ...typeScale.titleSmall,
    color: colors.primaryContainer,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
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
  oddsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
