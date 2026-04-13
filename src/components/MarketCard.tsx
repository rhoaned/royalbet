import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typeScale, spacing, radii } from '../theme';

interface MarketCardProps {
  name: string;
  liveCount: number;
  onPress?: () => void;
}

export default function MarketCard({ name, liveCount, onPress }: MarketCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>◆</Text>
      </View>
      {liveCount > 0 && (
        <View style={styles.liveBadge}>
          <Text style={styles.liveCount}>{liveCount} LIVE</Text>
        </View>
      )}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    padding: spacing.lg,
    aspectRatio: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}15`,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: colors.primaryContainer,
    fontSize: 18,
  },
  liveBadge: {
    backgroundColor: `${colors.secondaryContainer}20`,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveCount: {
    ...typeScale.labelSmall,
    color: colors.secondaryContainer,
    letterSpacing: 1,
  },
  name: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
