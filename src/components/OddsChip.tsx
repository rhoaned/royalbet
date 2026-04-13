import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, typeScale, spacing, radii } from '../theme';

interface OddsChipProps {
  odds: string;
  label?: string;
  isLive?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function OddsChip({
  odds,
  label,
  isLive = false,
  isSelected = false,
  onPress,
  style,
}: OddsChipProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.chip,
        isSelected && styles.chipSelected,
        isLive && styles.chipLive,
        style,
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <Text style={[
        styles.odds,
        isSelected && styles.oddsSelected,
        isLive && styles.oddsLive,
      ]}>
        {odds}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.lg,
    alignItems: 'center',
    minWidth: 64,
  },
  chipSelected: {
    backgroundColor: colors.primaryContainer,
  },
  chipLive: {
    backgroundColor: `${colors.secondaryContainer}20`,
  },
  label: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  odds: {
    ...typeScale.oddsDisplay,
    color: colors.onSurface,
  },
  oddsSelected: {
    color: colors.onPrimary,
  },
  oddsLive: {
    color: colors.secondaryContainer,
  },
});
