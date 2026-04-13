# RoyalBet

A premium betting app with a Tinder-style swipe UX — swipe right to place a bet, swipe left to skip, swipe up for Super Bet.

## Design System

Built on the **"Velvet Vault"** creative direction — deep layered blacks, Casino Gold (#FFD700) and Urgent Orange (#FF5625) accents, dual-font typography (Space Grotesk headlines + Manrope body).

## Screens

| Screen | Description |
|--------|-------------|
| **Onboarding** | Sport selection + tactical preference configuration |
| **Betting Deck** | Tinder-style swipeable bet cards (core experience) |
| **Market Hub** | Sports directory with live counts and search |
| **League Markets** | Outrights, match odds, trending props per league |
| **Bet Slip** | Build slip, set stake, view returns, place bet |
| **Active Bets** | Track live positions with cash-out |
| **Profile** | Balance, stats, settings |

## Tech Stack

- **Expo SDK 52** (managed workflow)
- **React Native 0.76**
- **TypeScript** (strict mode)
- **React Navigation 7** (native stack + bottom tabs)
- **React Native Reanimated 3** (card swipe animations)
- **React Native Gesture Handler 2** (pan gesture for swipe deck)
- **Expo Blur** (glassmorphism panels)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Mock data for development
├── hooks/          # Custom hooks (swipe gesture)
├── navigation/     # Navigator setup + type definitions
├── screens/        # All screen components
├── theme/          # Design tokens (colors, typography, spacing)
└── utils/          # Formatting helpers
```

## Getting Started

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` for iOS simulator / `a` for Android emulator.
