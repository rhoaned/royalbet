import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { colors, typeScale, spacing, radii } from '../theme';
import { RootStackParamList } from '../navigation/types';
import { deckMatches } from '../data/mockData';
import Header from '../components/Header';
import MatchRow from '../components/MatchRow';
import OddsChip from '../components/OddsChip';

type RouteType = RouteProp<RootStackParamList, 'LeagueMarkets'>;

export default function LeagueMarketsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteType>();
  const { leagueName } = route.params;
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow'>('today');

  return (
    <View style={styles.container}>
      <Header
        title={leagueName}
        onBackPress={() => navigation.goBack()}
        showBalance={false}
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search matches, teams, or players..."
            placeholderTextColor={colors.onSurfaceVariant}
          />
        </View>

        {/* Outrights */}
        <View style={styles.outrightSection}>
          <View style={styles.outrightHeader}>
            <View style={styles.hotBadge}>
              <Text style={styles.hotBadgeText}>Hot Market</Text>
            </View>
            <Text style={styles.outrightTitle}>{leagueName} Winner</Text>
            <Text style={styles.outrightSubtitle}>
              Outright winner for the current season
            </Text>
          </View>

          <View style={styles.outrightOdds}>
            <OddsChip label="Man City" odds="1.85" />
            <OddsChip label="Liverpool" odds="3.40" />
            <OddsChip label="Arsenal" odds="5.50" />
          </View>

          <TouchableOpacity style={styles.outrightBtn} activeOpacity={0.8}>
            <Text style={styles.outrightBtnText}>Place Outright Bet</Text>
          </TouchableOpacity>
        </View>

        {/* Match Markets */}
        <View style={styles.matchSection}>
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'today' && styles.tabActive]}
              onPress={() => setActiveTab('today')}
            >
              <Text style={[styles.tabText, activeTab === 'today' && styles.tabTextActive]}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'tomorrow' && styles.tabActive]}
              onPress={() => setActiveTab('tomorrow')}
            >
              <Text style={[styles.tabText, activeTab === 'tomorrow' && styles.tabTextActive]}>
                Tomorrow
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.matchList}>
            {deckMatches.map((match) => (
              <MatchRow
                key={match.id}
                match={match}
                onPress={() =>
                  navigation.navigate('BetSlip', { matchId: match.id })
                }
              />
            ))}
          </View>
        </View>

        {/* Trending Props */}
        <View style={styles.trendingSection}>
          <Text style={styles.trendingSectionTitle}>TRENDING PROPS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.trendingRow}>
              {['Haaland Anytime Scorer +120', 'Salah 2+ Shots on Target -110', 'Both Teams to Score -130'].map(
                (prop, i) => (
                  <TouchableOpacity key={i} style={styles.propChip} activeOpacity={0.8}>
                    <Text style={styles.propText}>{prop}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </ScrollView>
        </View>
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
    paddingBottom: spacing['6xl'],
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.lg,
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
  outrightSection: {
    backgroundColor: colors.surfaceContainer,
    marginHorizontal: spacing.lg,
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing['2xl'],
    borderLeftWidth: 3,
    borderLeftColor: colors.secondaryContainer,
  },
  outrightHeader: {
    marginBottom: spacing.lg,
  },
  hotBadge: {
    backgroundColor: `${colors.secondaryContainer}20`,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  hotBadgeText: {
    ...typeScale.labelSmall,
    color: colors.secondaryContainer,
    letterSpacing: 1,
  },
  outrightTitle: {
    ...typeScale.titleLarge,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  outrightSubtitle: {
    ...typeScale.bodySmall,
    color: colors.onSurfaceVariant,
  },
  outrightOdds: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  outrightBtn: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.default,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  outrightBtnText: {
    ...typeScale.labelMedium,
    color: colors.primaryContainer,
    letterSpacing: 1,
  },
  matchSection: {
    marginBottom: spacing['2xl'],
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
  },
  tabActive: {
    backgroundColor: colors.primaryContainer,
  },
  tabText: {
    ...typeScale.labelMedium,
    color: colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: colors.onPrimary,
  },
  matchList: {
    gap: spacing.xxs,
  },
  trendingSection: {
    paddingHorizontal: spacing.lg,
  },
  trendingSectionTitle: {
    ...typeScale.labelMedium,
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  trendingRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  propChip: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  propText: {
    ...typeScale.labelMedium,
    color: colors.onSurface,
  },
});
