import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typeScale, spacing, radii } from '../theme';

interface SportCardProps {
  name: string;
  imageUrl?: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export default function SportCard({ name, imageUrl, isSelected = false, onPress }: SportCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        isSelected ? styles.selected : styles.unselected,
      ]}
    >
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            isSelected ? styles.imageSelected : styles.imageUnselected,
          ]}
        />
      )}
      <View style={styles.content}>
        <Text style={[styles.name, isSelected ? styles.nameSelected : styles.nameUnselected]}>
          {name}
        </Text>
      </View>
      {isSelected && (
        <View style={styles.check}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: radii.default,
    justifyContent: 'flex-end',
    padding: spacing.lg,
    overflow: 'hidden',
  },
  selected: {
    backgroundColor: colors.primaryContainer,
  },
  unselected: {
    backgroundColor: colors.surfaceContainer,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  imageSelected: {
    opacity: 0.6,
  },
  imageUnselected: {
    opacity: 0.2,
  },
  content: {
    zIndex: 1,
  },
  name: {
    ...typeScale.headlineSmall,
    fontStyle: 'italic',
  },
  nameSelected: {
    color: colors.onPrimary,
  },
  nameUnselected: {
    color: colors.onSurfaceVariant,
  },
  check: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.onPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: colors.primaryContainer,
    fontSize: 14,
    fontWeight: '700',
  },
});
