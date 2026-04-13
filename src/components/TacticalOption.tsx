import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typeScale, spacing, radii } from '../theme';

interface TacticalOptionProps {
  title: string;
  description: string;
  icon: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function TacticalOption({
  title,
  description,
  icon,
  isActive = false,
  onPress,
}: TacticalOptionProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        isActive && styles.containerActive,
      ]}
    >
      <View style={styles.left}>
        <View style={[styles.iconWrap, isActive ? styles.iconWrapActive : styles.iconWrapDefault]}>
          <Text style={[styles.icon, { color: isActive ? colors.primaryContainer : colors.secondaryContainer }]}>
            {icon}
          </Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, isActive && styles.titleActive]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={[styles.radio, isActive && styles.radioActive]}>
        {isActive && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.surfaceContainer,
    borderLeftWidth: 4,
    borderLeftColor: colors.transparent,
  },
  containerActive: {
    borderLeftColor: colors.primaryContainer,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    flex: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDefault: {
    backgroundColor: colors.surfaceContainerLow,
  },
  iconWrapActive: {
    backgroundColor: `${colors.primaryContainer}1A`,
  },
  icon: {
    fontSize: 22,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleActive: {
    color: colors.primary,
  },
  description: {
    ...typeScale.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  radioActive: {
    borderColor: colors.primaryContainer,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryContainer,
  },
});
