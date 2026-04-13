export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  BetSlip: { matchId: string };
  LeagueMarkets: { leagueId: string; leagueName: string };
};

export type MainTabParamList = {
  Deck: undefined;
  Markets: undefined;
  Activity: undefined;
  Profile: undefined;
};

export type Sport = 'nfl' | 'nba' | 'mlb' | 'soccer' | 'ufc' | 'atp' | 'f1' | 'nhl' | 'ipl' | 'pga' | 'esports';

export type TacticalStyle = 'sharp' | 'live' | 'parlay';

export type BetStatus = 'winning' | 'in_progress' | 'losing' | 'almost_done';

export type SwipeDirection = 'left' | 'right' | 'up';

export type TransactionType = 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bet_lost' | 'bonus' | 'cashout';

export type SettledBetResult = 'won' | 'lost' | 'void' | 'cashout';

export type PromotionType = 'odds_boost' | 'free_bet' | 'deposit_match' | 'parlay_insurance' | 'loyalty_reward';

export interface Match {
  id: string;
  league: string;
  sport: Sport;
  homeTeam: string;
  awayTeam: string;
  homeOdds: string;
  awayOdds: string;
  spread?: string;
  overUnder?: string;
  drawOdds?: string;
  isLive: boolean;
  liveStatus?: string;
  homeScore?: number;
  awayScore?: number;
  gameTime?: string;
  winProbability?: number;
  poolValue?: string;
  volume?: string;
  sharpSentiment?: string;
  imageUrl?: string;
}

export interface ActiveBet {
  id: string;
  match: Match;
  status: BetStatus;
  stake: number;
  odds: string;
  potentialPayout: number;
  cashOutValue?: number;
  parlayLegs?: number;
  parlayWon?: number;
}

export interface SettledBet {
  id: string;
  match: Match;
  result: SettledBetResult;
  market: string;
  selection: string;
  stake: number;
  odds: string;
  payout: number;
  settledAt: string;
  parlayLegs?: number;
}

export interface BetSlipSelection {
  id: string;
  market: string;
  selection: string;
  odds: number;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  balance: number;
  description: string;
  timestamp: string;
  referenceId?: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  balance: number;
  bonusBalance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  totalWagered: number;
  totalWon: number;
  winRate: number;
  totalBets: number;
  currentStreak: number;
  streakType: 'W' | 'L';
  roi: number;
  memberSince: string;
  lastLogin: string;
  favoriteSports: Sport[];
  tacticalStyle: TacticalStyle;
}

export interface Promotion {
  id: string;
  type: PromotionType;
  title: string;
  description: string;
  multiplier?: number;
  value?: number;
  minOdds?: number;
  expiresAt: string;
  isActive: boolean;
  sportRestriction?: Sport;
}

export interface LeagueMarket {
  id: string;
  sport: Sport;
  leagueName: string;
  matches: Match[];
  outrightOptions: { label: string; odds: string }[];
  trendingProps: string[];
}
