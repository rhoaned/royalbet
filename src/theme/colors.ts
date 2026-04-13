export const colors = {
  // Primary
  primary: '#FFF6DF',
  primaryContainer: '#FFD700',
  primaryFixed: '#FFE16D',
  primaryFixedDim: '#E9C400',
  onPrimary: '#3A3000',
  onPrimaryContainer: '#705E00',
  onPrimaryFixed: '#221B00',
  onPrimaryFixedVariant: '#544600',
  inversePrimary: '#705D00',

  // Secondary
  secondary: '#FFB5A0',
  secondaryContainer: '#FF5625',
  secondaryFixed: '#FFDBD1',
  secondaryFixedDim: '#FFB5A0',
  onSecondary: '#601400',
  onSecondaryContainer: '#541100',
  onSecondaryFixed: '#3B0900',
  onSecondaryFixedVariant: '#872000',

  // Tertiary
  tertiary: '#DEFCFF',
  tertiaryContainer: '#00F1FF',
  tertiaryFixed: '#79F5FF',
  tertiaryFixedDim: '#00DBE8',
  onTertiary: '#00363A',
  onTertiaryContainer: '#006A70',
  onTertiaryFixed: '#002022',
  onTertiaryFixedVariant: '#004F54',

  // Error
  error: '#FFB4AB',
  errorContainer: '#93000A',
  onError: '#690005',
  onErrorContainer: '#FFDAD6',

  // Surface hierarchy (deepest → highest)
  surface: '#131314',
  surfaceDim: '#131314',
  surfaceBright: '#3A393A',
  surfaceVariant: '#353436',
  surfaceTint: '#E9C400',
  surfaceContainerLowest: '#0E0E0F',
  surfaceContainerLow: '#1C1B1C',
  surfaceContainer: '#201F20',
  surfaceContainerHigh: '#2A2A2B',
  surfaceContainerHighest: '#353436',

  // Foreground
  onSurface: '#E5E2E3',
  onSurfaceVariant: '#D0C6AB',
  onBackground: '#E5E2E3',
  background: '#131314',

  // Outline
  outline: '#999077',
  outlineVariant: '#4D4732',

  // Inverse
  inverseSurface: '#E5E2E3',
  inverseOnSurface: '#313031',

  // Semantic shortcuts
  gold: '#FFD700',
  urgentOrange: '#FF5625',
  cyan: '#00F1FF',

  // Transparency helpers
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
