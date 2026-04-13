import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { SwipeDirection } from '../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_UP_THRESHOLD = 120;

interface UseSwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
}

export function useSwipeGesture(options: UseSwipeGestureOptions) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const leftIndicatorOpacity = useSharedValue(0);
  const rightIndicatorOpacity = useSharedValue(0);
  const superBetIndicatorOpacity = useSharedValue(0);

  const resetCard = useCallback(() => {
    'worklet';
    translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
    translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    rotation.value = withSpring(0, { damping: 20, stiffness: 200 });
    scale.value = withSpring(1);
    leftIndicatorOpacity.value = withTiming(0);
    rightIndicatorOpacity.value = withTiming(0);
    superBetIndicatorOpacity.value = withTiming(0);
  }, []);

  const dismissCard = useCallback((direction: SwipeDirection) => {
    'worklet';
    const onComplete = () => {
      if (direction === 'left') options.onSwipeLeft?.();
      else if (direction === 'right') options.onSwipeRight?.();
      else options.onSwipeUp?.();
    };

    if (direction === 'left') {
      translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
        runOnJS(onComplete)();
      });
      rotation.value = withTiming(-20, { duration: 300 });
    } else if (direction === 'right') {
      translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
        runOnJS(onComplete)();
      });
      rotation.value = withTiming(20, { duration: 300 });
    } else {
      translateY.value = withTiming(-600, { duration: 400 }, () => {
        runOnJS(onComplete)();
      });
      scale.value = withTiming(0.8, { duration: 400 });
    }

    opacity.value = withTiming(0, { duration: 300 });
  }, [options.onSwipeLeft, options.onSwipeRight, options.onSwipeUp]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = Math.min(0, event.translationY);
      rotation.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-15, 0, 15],
        Extrapolation.CLAMP,
      );

      rightIndicatorOpacity.value = interpolate(
        event.translationX,
        [0, SWIPE_THRESHOLD],
        [0, 1],
        Extrapolation.CLAMP,
      );
      leftIndicatorOpacity.value = interpolate(
        event.translationX,
        [-SWIPE_THRESHOLD, 0],
        [1, 0],
        Extrapolation.CLAMP,
      );
      superBetIndicatorOpacity.value = interpolate(
        event.translationY,
        [-SWIPE_UP_THRESHOLD, 0],
        [1, 0],
        Extrapolation.CLAMP,
      );
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        dismissCard('right');
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        dismissCard('left');
      } else if (event.translationY < -SWIPE_UP_THRESHOLD) {
        dismissCard('up');
      } else {
        resetCard();
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const nextCardAnimatedStyle = useAnimatedStyle(() => {
    const progress = Math.min(
      Math.abs(translateX.value) / SWIPE_THRESHOLD,
      1,
    );
    return {
      transform: [
        { scale: interpolate(progress, [0, 1], [0.92, 1]) },
      ],
      opacity: interpolate(progress, [0, 1], [0.5, 1]),
    };
  });

  const resetPosition = useCallback(() => {
    translateX.value = 0;
    translateY.value = 0;
    rotation.value = 0;
    scale.value = 1;
    opacity.value = 1;
    leftIndicatorOpacity.value = 0;
    rightIndicatorOpacity.value = 0;
    superBetIndicatorOpacity.value = 0;
  }, []);

  return {
    panGesture,
    cardAnimatedStyle,
    nextCardAnimatedStyle,
    leftIndicatorOpacity,
    rightIndicatorOpacity,
    superBetIndicatorOpacity,
    dismissCard,
    resetPosition,
  };
}
