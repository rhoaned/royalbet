import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typeScale, spacing, radii } from '../theme';
import { RootStackParamList } from '../navigation/types';
import { sportsList } from '../data/mockData';
import Header from '../components/Header';
import MarketCard from '../components/MarketCard';
import GlassPanel from '../components/GlassPanel';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function MarketHubScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const [search, setSearch] = useState('');

  const filteredSports = search
    ? sportsList.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()),
      )
    : sportsList;

  return (
    <View style={styles.container}>
      <Header title="KINETIC" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.hubTitle}>MARKET HUB</Text>
        <Text style={styles.hubSubtitle}>
          Explore the most liquid markets across every discipline.
        </Text>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search sports, leagues, markets..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Featured Hero */}
        <View style={styles.featuredRow}>
          <TouchableOpacity
            style={styles.featuredHero}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('LeagueMarkets', {
                leagueId: 'nba',
                leagueName: 'NBA Finals',
              })
            }
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroLeague}>NBA FINALS</Text>
              <Text style={styles.heroMatchup}>WARRIORS vs CELTICS</Text>
              <View style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>VIEW MARKET</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rewardPanel} activeOpacity={0.8}>
            <Text style={styles.rewardTitle}>ROYAL{'\n'}REWARD</Text>
            <Text style={styles.rewardCopy}>
              EARN 2X POINTS ON ALL PARLAYS TODAY
            </Text>
            <View style={styles.claimBtn}>
              <Text style={styles.claimBtnText}>CLAIM BOOST</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sports Grid */}
        <View style={styles.sportsGrid}>
          {filteredSports.map((sport) => (
            <MarketCard
              key={sport.id}
              name={sport.name}
              liveCount={sport.liveCount}
              onPress={() =>
                navigation.navigate('LeagueMarkets', {
                  leagueId: sport.id,
                  leagueName: sport.name,
                })
              }
            />
          ))}
        </View>

        {/* Live Activity */}
        <GlassPanel style={styles.liveActivity}>
          <Text style={styles.liveActivityTitle}>LIVE ACTIVITY</Text>
          <View style={styles.activityRow}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityMatch}>
                Lakers ML vs Warriors +145
              </Text>
              <Text style={styles.activityMeta}>$4.2M TRADED</Text>
            </View>
          </View>
          <View style={styles.activityRow}>
            <View style={[styles.activityDot, { backgroundColor: colors.tertiaryFixedDim }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityMatch}>
                Real Madrid vs Man City (U 2.5)
              </Text>
              <Text style={styles.activityMeta}>PAYOUT COMPLETE</Text>
            </View>
          </View>
        </GlassPanel>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing['6xl'],
  },
  hubTitle: {
    ...typeScale.headlineLarge,
    color: colors.onSurface,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  hubSubtitle: {
    ...typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xl,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}15`,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typeScale.bodyMedium,
    color: colors.onSurface,
    paddingVertical: spacing.md,
  },
  featuredRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  featuredHero: {
    flex: 2,
    height: 180,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: spacing.lg,
    backgroundColor: 'rgba(19,19,20,0.7)',
  },
  heroLeague: {
    ...typeScale.labelSmall,
    color: colors.secondaryContainer,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  heroMatchup: {
    ...typeScale.titleLarge,
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  heroBtn: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: radii.default,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    ...typeScale.labelMedium,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  rewardPanel: {
    flex: 1,
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.xl,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  rewardTitle: {
    ...typeScale.headlineSmall,
    color: colors.onPrimary,
    fontStyle: 'italic',
  },
  rewardCopy: {
    ...typeScale.labelSmall,
    color: colors.onPrimary,
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  claimBtn: {
    backgroundColor: colors.onPrimary,
    borderRadius: radii.default,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
  },
  claimBtnText: {
    ...typeScale.labelSmall,
    color: colors.primaryContainer,
    letterSpacing: 1,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
    justifyContent: 'space-between',
  },
  liveActivity: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  liveActivityTitle: {
    ...typeScale.labelMedium,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryContainer,
  },
  activityContent: {
    flex: 1,
  },
  activityMatch: {
    ...typeScale.titleSmall,
    color: colors.onSurface,
  },
  activityMeta: {
    ...typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
});
