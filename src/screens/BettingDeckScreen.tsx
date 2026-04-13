import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typeScale, spacing, shadows } from '../theme';
import { RootStackParamList } from '../navigation/types';
import { deckMatches } from '../data/mockData';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import Header from '../components/Header';
import SwipeBetCard from '../components/SwipeBetCard';
import DrawerMenu from '../components/DrawerMenu';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function BettingDeckScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const drawerOpen = useSharedValue(0);
  const nextLeftOpacity = useSharedValue(0);
  const nextRightOpacity = useSharedValue(0);
  const nextSuperOpacity = useSharedValue(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, deckMatches.length - 1));
  }, []);

  const handleSwipeLeft = useCallback(() => {
    goToNext();
  }, [goToNext]);

  const handleSwipeRight = useCallback(() => {
    const match = deckMatches[currentIndex];
    navigation.navigate('BetSlip', { matchId: match.id });
    goToNext();
  }, [currentIndex, goToNext, navigation]);

  const handleSwipeUp = useCallback(() => {
    const match = deckMatches[currentIndex];
    navigation.navigate('BetSlip', { matchId: match.id });
    goToNext();
  }, [currentIndex, goToNext, navigation]);

  const {
    panGesture,
    cardAnimatedStyle,
    nextCardAnimatedStyle,
    leftIndicatorOpacity,
    rightIndicatorOpacity,
    superBetIndicatorOpacity,
    dismissCard,
    resetPosition,
  } = useSwipeGesture({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    onSwipeUp: handleSwipeUp,
  });

  const currentMatch = deckMatches[currentIndex];
  const nextMatch = deckMatches[currentIndex + 1];

  const openDrawer = () => {
    drawerOpen.value = withTiming(1, { duration: 300 });
  };

  const closeDrawer = () => {
    drawerOpen.value = withTiming(0, { duration: 250 });
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Header onMenuPress={openDrawer} />

        {/* Card Stack */}
        <View style={styles.deckArea}>
          {currentIndex >= deckMatches.length ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎯</Text>
              <Text style={styles.emptyTitle}>ALL CAUGHT UP</Text>
              <Text style={styles.emptySubtitle}>
                Check back soon for new market opportunities
              </Text>
            </View>
          ) : (
            <>
              {/* Next card (behind) */}
              {nextMatch && (
                <Animated.View style={[styles.cardPosition, nextCardAnimatedStyle]}>
                  <SwipeBetCard
                    match={nextMatch}
                    leftIndicatorOpacity={nextLeftOpacity}
                    rightIndicatorOpacity={nextRightOpacity}
                    superBetIndicatorOpacity={nextSuperOpacity}
                  />
                </Animated.View>
              )}

              {/* Active card */}
              <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.cardPosition, cardAnimatedStyle]}>
                  <SwipeBetCard
                    match={currentMatch}
                    leftIndicatorOpacity={leftIndicatorOpacity}
                    rightIndicatorOpacity={rightIndicatorOpacity}
                    superBetIndicatorOpacity={superBetIndicatorOpacity}
                  />
                </Animated.View>
              </GestureDetector>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionRow, { paddingBottom: insets.bottom + 80 }]}>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => {
              resetPosition();
              dismissCard('left');
            }}
          >
            <Text style={styles.skipBtnText}>✕</Text>
            <Text style={styles.actionLabel}>PASS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.superBetBtn}
            onPress={() => {
              resetPosition();
              dismissCard('up');
            }}
          >
            <Text style={styles.superBetBtnText}>⭐</Text>
            <Text style={styles.superBetLabel}>SUPER BET</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.betBtn}
            onPress={() => {
              resetPosition();
              dismissCard('right');
            }}
          >
            <Text style={styles.betBtnText}>♥</Text>
            <Text style={styles.actionLabel}>SAVE</Text>
          </TouchableOpacity>
        </View>

        <DrawerMenu isOpen={drawerOpen} onClose={closeDrawer} />
      </View>
    </GestureHandlerRootView>
  );
}

const ACTION_SIZE = 56;
const SUPER_SIZE = 72;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  deckArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPosition: {
    position: 'absolute',
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typeScale.headlineMedium,
    color: colors.onSurface,
    letterSpacing: 3,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing['2xl'],
    paddingVertical: spacing.lg,
  },
  skipBtn: {
    width: ACTION_SIZE,
    height: ACTION_SIZE,
    borderRadius: ACTION_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtnText: {
    fontSize: 24,
    color: colors.outline,
  },
  superBetBtn: {
    width: SUPER_SIZE,
    height: SUPER_SIZE,
    borderRadius: SUPER_SIZE / 2,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.cta,
  },
  superBetBtnText: {
    fontSize: 28,
  },
  superBetLabel: {
    ...typeScale.labelSmall,
    color: colors.onPrimary,
    position: 'absolute',
    bottom: -18,
    letterSpacing: 1,
  },
  betBtn: {
    width: ACTION_SIZE,
    height: ACTION_SIZE,
    borderRadius: ACTION_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  betBtnText: {
    fontSize: 24,
    color: colors.secondaryContainer,
  },
  actionLabel: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    position: 'absolute',
    bottom: -18,
    letterSpacing: 1,
  },
});
