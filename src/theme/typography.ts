import { TextStyle } from 'react-native';

export const fontFamilies = {
  headline: 'SpaceGrotesk_700Bold',
  headlineBlack: 'SpaceGrotesk_700Bold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  label: 'Manrope_500Medium',
} as const;

export const typeScale = {
  displayLarge: {
    fontFamily: fontFamilies.headlineBlack,
    fontSize: 56,
    lineHeight: 50,
    letterSpacing: -2,
  } as TextStyle,

  displayMedium: {
    fontFamily: fontFamilies.headlineBlack,
    fontSize: 45,
    lineHeight: 40,
    letterSpacing: -1.5,
  } as TextStyle,

  headlineLarge: {
    fontFamily: fontFamilies.headline,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.5,
  } as TextStyle,

  headlineMedium: {
    fontFamily: fontFamilies.headline,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.3,
  } as TextStyle,

  headlineSmall: {
    fontFamily: fontFamilies.headline,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.2,
  } as TextStyle,

  titleLarge: {
    fontFamily: fontFamilies.headline,
    fontSize: 22,
    lineHeight: 28,
  } as TextStyle,

  titleMedium: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  } as TextStyle,

  titleSmall: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  bodyLarge: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,

  bodyMedium: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  } as TextStyle,

  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  } as TextStyle,

  labelLarge: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  labelMedium: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,

  labelSmall: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
  } as TextStyle,

  oddsDisplay: {
    fontFamily: fontFamilies.headline,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,
} as const;
