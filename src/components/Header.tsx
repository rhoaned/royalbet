import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typeScale, spacing } from '../theme';

interface HeaderProps {
  title?: string;
  balance?: string;
  onMenuPress?: () => void;
  onAvatarPress?: () => void;
  onBackPress?: () => void;
  showBalance?: boolean;
}

export default function Header({
  title = 'KINETIC',
  balance = '$14,250.00',
  onMenuPress,
  onAvatarPress,
  onBackPress,
  showBalance = true,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.left}>
        {onBackPress ? (
          <TouchableOpacity onPress={onBackPress} style={styles.iconBtn}>
            <Text style={styles.iconText}>‹</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn}>
            <Text style={styles.iconText}>☰</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right}>
        {showBalance && (
          <View style={styles.balancePill}>
            <Text style={styles.balanceText}>{balance}</Text>
          </View>
        )}
        <TouchableOpacity onPress={onAvatarPress} style={styles.avatar}>
          <Text style={styles.avatarText}>R</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  left: {
    width: 40,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: colors.primaryContainer,
    fontSize: 24,
  },
  title: {
    ...typeScale.titleLarge,
    color: colors.primaryContainer,
    fontStyle: 'italic',
    letterSpacing: 3,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
  },
  avatarText: {
    ...typeScale.labelMedium,
    color: colors.primaryContainer,
  },
});
