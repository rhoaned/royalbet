import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typeScale, spacing } from '../theme';
import { RootStackParamList, Sport, TacticalStyle } from '../navigation/types';
import ProgressBar from '../components/ProgressBar';
import SportCard from '../components/SportCard';
import TacticalOption from '../components/TacticalOption';
import ActionButton from '../components/ActionButton';

const SPORTS_DATA: { id: Sport; name: string; imageUrl: string }[] = [
  {
    id: 'nfl',
    name: 'NFL',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCseEGXEJyBbAT7clwGEcgf7w9U6V2dqyCzFmsJleNNM8b9mvML7EasFsMvzQ74zpIIaaYRD4L143d9zR9PsDc2OrYkMbU9zsvj9BvSfcw7zSnN-lOBulgcVWP2puWQjELDTpZ3axoMB70s8zRdHhDsfVDoH1SE-kWbk-u5-BIRnwhB4Wszedkru84RXr6UXBteoA-rc2iuAGEpVg0TbFU7sprgc3-h5YdjYQI0Lufax3sleCWhLpUehhjiey78JjZcPZ5vNgZVeE1d',
  },
  {
    id: 'nba',
    name: 'NBA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgclUtfFLtw4wVlGVze9n4Dq-Y_v2EuM27Z-VSV8Ofzoli8MCF4UnvY4dUXLdLiP_A82wSiHlZ6OKXzNBt4hv3RUdyoYEeOhHw05sYG5HAK3a_g11Jbf7XRNirMf95Yn58LlPDC1NpIV4pdADPZY2ObxZpanjb3811qca2wKjUFf4TpGcLZXXKADNC7pOlBub1uS4gDXbD1o6fgGWV03KJ4pBEeQsAMD1-3gwmJ0BY30YzuawDcuLvuwBD0htJ-J6STMFA15ixMMQK',
  },
  {
    id: 'mlb',
    name: 'MLB',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCleqyFkfdyW6OuP-rWB2Sq5nZYFf93YLEr6lJ4B611oxvTkoHWBEv8anJljbRRVG93unC6gjaEd9nnGQgGuPDZh38d1c6VckXtjfpSAmZi7BHvXLUedTz6g2JvWJQMC14slvMXUNe6gL46wdj_gtX7w1CK6Ytnc-vaoqS8MPo800rJgibxW6nwB1Vc-zi07NUl7nWqtqj6R9ajDor3W0kFzZyY0qud_e9EmtjkqqSdGU31MVWRy2Phf9QG_DWVKVOFAytCgbvJZGj',
  },
  {
    id: 'soccer',
    name: 'SOCCER',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKO75jZtdSGP1vjegoTv2RCfuxfDWcSxsiuLNaQfW7gMWdTOBvn_su8I16fl7n8g4uDM98S80N0gFSIHGBCt6CVCj6SsSUWdnIZRAq_WirSgbfRg2TdKYORwP3GGHQXuIP0WElAozl8c2lnmNGMl3xD4thDguluDDYdspnLOeb79jGY6X2ZymKQ9yo-Czey5V44D4rTU2auOTsbwNmbFEHJBfArO1hnZDDcgbgLbWL3lEZkuyFcKJgSeJFWO3wiZ8bSQ8SnDkFmFaI',
  },
];

const TACTICAL_OPTIONS = [
  {
    id: 'sharp' as TacticalStyle,
    title: 'SHARP ANALYTICS',
    description: 'Focus on high-limit markets and statistical discrepancies.',
    icon: '⚡',
  },
  {
    id: 'live' as TacticalStyle,
    title: 'LIVE SPECULATOR',
    description: 'Prioritize in-play momentum shifts and rapid-fire execution.',
    icon: '📡',
  },
  {
    id: 'parlay' as TacticalStyle,
    title: 'PARLAY ARCHITECT',
    description: 'Build complex narratives across multiple disciplines for exponential yield.',
    icon: '🏛',
  },
];

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const [selectedSports, setSelectedSports] = useState<Sport[]>(['nfl', 'soccer']);
  const [selectedStyle, setSelectedStyle] = useState<TacticalStyle>('live');

  const toggleSport = (id: Sport) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const progress = Math.min(
    25 + selectedSports.length * 15 + (selectedStyle ? 20 : 0),
    100,
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProgressBar phase="Configuration Phase 01" percentage={progress} />

      {/* Headline */}
      <Text style={styles.headline}>
        TAILOR YOUR{'\n'}
        <Text style={styles.headlineAccent}>PRECISION</Text>
        {'\n'}EXPERIENCE
      </Text>

      <View style={styles.descriptionWrap}>
        <View style={styles.descriptionBorder} />
        <Text style={styles.description}>
          Define your theater of operations. Select the arenas and tactical
          styles that fuel your high-stakes strategy.
        </Text>
      </View>

      {/* Sports Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Arenas</Text>
          <Text style={styles.sectionHint}>Pick at least two</Text>
        </View>
        <View style={styles.sportsGrid}>
          {SPORTS_DATA.map((sport) => (
            <SportCard
              key={sport.id}
              name={sport.name}
              imageUrl={sport.imageUrl}
              isSelected={selectedSports.includes(sport.id)}
              onPress={() => toggleSport(sport.id)}
            />
          ))}
        </View>
      </View>

      {/* Tactical Preference */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tactical Preference</Text>
        <View style={styles.tacticalList}>
          {TACTICAL_OPTIONS.map((option) => (
            <TacticalOption
              key={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              isActive={selectedStyle === option.id}
              onPress={() => setSelectedStyle(option.id)}
            />
          ))}
        </View>
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <ActionButton
          label="START BETTING"
          variant="primary"
          fullWidth
          onPress={() => navigation.replace('Main')}
        />
        <ActionButton
          label="CONFIGURE LATER"
          variant="secondary"
          fullWidth
          onPress={() => navigation.replace('Main')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing['6xl'],
  },
  headline: {
    ...typeScale.displayLarge,
    color: colors.onSurface,
    marginBottom: spacing['2xl'],
  },
  headlineAccent: {
    color: colors.primaryContainer,
    fontStyle: 'italic',
  },
  descriptionWrap: {
    flexDirection: 'row',
    marginBottom: spacing['4xl'],
  },
  descriptionBorder: {
    width: 2,
    backgroundColor: colors.primaryContainer,
    marginRight: spacing.lg,
  },
  description: {
    ...typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    flex: 1,
    lineHeight: 26,
  },
  section: {
    marginBottom: spacing['3xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typeScale.headlineSmall,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: -0.3,
  },
  sectionHint: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 2,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  tacticalList: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  ctaSection: {
    borderTopWidth: 1,
    borderTopColor: `${colors.outlineVariant}33`,
    paddingTop: spacing['2xl'],
    gap: spacing.md,
  },
});
