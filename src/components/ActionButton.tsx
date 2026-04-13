import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, typeScale, spacing, radii, shadows } from '../theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'urgent';

interface ActionButtonProps {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

export default function ActionButton({
  label,
  variant = 'primary',
  onPress,
  style,
  fullWidth = false,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.base,
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <Text style={[styles.label, labelVariantStyles[variant]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['3xl'],
    borderRadius: radii.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    ...typeScale.labelLarge,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primaryContainer,
    ...shadows.cta,
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  urgent: {
    backgroundColor: colors.secondaryContainer,
  },
};

const labelVariantStyles: Record<Variant, object> = {
  primary: { color: colors.onPrimary, ...typeScale.titleLarge, letterSpacing: 3 },
  secondary: { color: colors.onSurfaceVariant },
  ghost: { color: colors.onSurfaceVariant },
  urgent: { color: '#FFFFFF', ...typeScale.titleLarge, letterSpacing: 3 },
};
