import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typeScale, spacing } from '../theme';

interface ProgressBarProps {
  phase: string;
  percentage: number;
}

export default function ProgressBar({ phase, percentage }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phase}>{phase}</Text>
        <Text style={styles.percent}>{percentage}% COMPLETE</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  phase: {
    ...typeScale.labelSmall,
    color: colors.secondaryContainer,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  percent: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
  },
  track: {
    height: 3,
    width: '100%',
    backgroundColor: colors.surfaceContainerHighest,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.secondaryContainer,
  },
});
