import {
  Match,
  ActiveBet,
  BetSlipSelection,
  SettledBet,
  Transaction,
  UserProfile,
  Promotion,
  LeagueMarket,
} from '../navigation/types';

// ---------------------------------------------------------------------------
// User profile — central account state for the entire app
// ---------------------------------------------------------------------------
export const userProfile: UserProfile = {
  id: 'usr_001',
  displayName: 'ROYAL BETTOR',
  email: 'royal.bettor@email.com',
  tier: 'gold',
  balance: 14250.0,
  bonusBalance: 350.0,
  totalDeposited: 22000.0,
  totalWithdrawn: 8500.0,
  totalWagered: 47320.0,
  totalWon: 52180.0,
  winRate: 64,
  totalBets: 847,
  currentStreak: 7,
  streakType: 'W',
  roi: 22.4,
  memberSince: '2024-09-15',
  lastLogin: '2026-04-13T08:42:00Z',
  favoriteSports: ['nba', 'soccer', 'nfl'],
  tacticalStyle: 'live',
};

// ---------------------------------------------------------------------------
// Matches — 12 entries covering live, upcoming, multi-sport, edge cases
// ---------------------------------------------------------------------------
export const deckMatches: Match[] = [
  {
    id: '1',
    league: 'NBA • REGULAR SEASON',
    sport: 'nba',
    homeTeam: 'LAKERS',
    awayTeam: 'CELTICS',
    homeOdds: '-180',
    awayOdds: '+155',
    spread: '-4.5',
    overUnder: '224.5',
    isLive: true,
    liveStatus: 'LIVE Q3 4:22',
    homeScore: 78,
    awayScore: 71,
    gameTime: '2026-04-13T19:30:00Z',
    winProbability: 58,
    poolValue: '$2.4M',
    volume: 'High',
    sharpSentiment: 'Hot',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgclUtfFLtw4wVlGVze9n4Dq-Y_v2EuM27Z-VSV8Ofzoli8MCF4UnvY4dUXLdLiP_A82wSiHlZ6OKXzNBt4hv3RUdyoYEeOhHw05sYG5HAK3a_g11Jbf7XRNirMf95Yn58LlPDC1NpIV4pdADPZY2ObxZpanjb3811qca2wKjUFf4TpGcLZXXKADNC7pOlBub1uS4gDXbD1o6fgGWV03KJ4pBEeQsAMD1-3gwmJ0BY30YzuawDcuLvuwBD0htJ-J6STMFA15ixMMQK',
  },
  {
    id: '2',
    league: 'NFL • WEEK 14',
    sport: 'nfl',
    homeTeam: 'CHIEFS',
    awayTeam: 'EAGLES',
    homeOdds: '-145',
    awayOdds: '+125',
    spread: '-3.0',
    overUnder: '48.5',
    isLive: false,
    gameTime: '2026-04-14T13:00:00Z',
    winProbability: 62,
    poolValue: '$5.1M',
    volume: 'High',
    sharpSentiment: 'Neutral',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCseEGXEJyBbAT7clwGEcgf7w9U6V2dqyCzFmsJleNNM8b9mvML7EasFsMvzQ74zpIIaaYRD4L143d9zR9PsDc2OrYkMbU9zsvj9BvSfcw7zSnN-lOBulgcVWP2puWQjELDTpZ3axoMB70s8zRdHhDsfVDoH1SE-kWbk-u5-BIRnwhB4Wszedkru84RXr6UXBteoA-rc2iuAGEpVg0TbFU7sprgc3-h5YdjYQI0Lufax3sleCWhLpUehhjiey78JjZcPZ5vNgZVeE1d',
  },
  {
    id: '3',
    league: 'EPL • MATCHDAY 16',
    sport: 'soccer',
    homeTeam: 'MAN CITY',
    awayTeam: 'ARSENAL',
    homeOdds: '+110',
    awayOdds: '+240',
    drawOdds: '+220',
    overUnder: '2.5',
    isLive: true,
    liveStatus: "LIVE 74'",
    homeScore: 2,
    awayScore: 1,
    gameTime: '2026-04-13T15:00:00Z',
    winProbability: 72,
    poolValue: '$3.8M',
    volume: 'High',
    sharpSentiment: 'Hot',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKO75jZtdSGP1vjegoTv2RCfuxfDWcSxsiuLNaQfW7gMWdTOBvn_su8I16fl7n8g4uDM98S80N0gFSIHGBCt6CVCj6SsSUWdnIZRAq_WirSgbfRg2TdKYORwP3GGHQXuIP0WElAozl8c2lnmNGMl3xD4thDguluDDYdspnLOeb79jGY6X2ZymKQ9yo-Czey5V44D4rTU2auOTsbwNmbFEHJBfArO1hnZDDcgbgLbWL3lEZkuyFcKJgSeJFWO3wiZ8bSQ8SnDkFmFaI',
  },
  {
    id: '4',
    league: 'NBA • PLAYOFFS',
    sport: 'nba',
    homeTeam: 'WARRIORS',
    awayTeam: 'CELTICS',
    homeOdds: '+130',
    awayOdds: '-150',
    spread: '+2.5',
    overUnder: '218.5',
    isLive: false,
    gameTime: '2026-04-15T20:00:00Z',
    winProbability: 45,
    poolValue: '$8.2M',
    volume: 'High',
    sharpSentiment: 'Cold',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCleqyFkfdyW6OuP-rWB2Sq5nZYFf93YLEr6lJ4B611oxvTkoHWBEv8anJljbRRVG93unC6gjaEd9nnGQgGuPDZh38d1c6VckXtjfpSAmZi7BHvXLUedTz6g2JvWJQMC14slvMXUNe6gL46wdj_gtX7w1CK6Ytnc-vaoqS8MPo800rJgibxW6nwB1Vc-zi07NUl7nWqtqj6R9ajDor3W0kFzZyY0qud_e9EmtjkqqSdGU31MVWRy2Phf9QG_DWVKVOFAytCgbvJZGj',
  },
  {
    id: '5',
    league: 'UFC • FIGHT NIGHT',
    sport: 'ufc',
    homeTeam: 'JONES',
    awayTeam: 'MIOCIC',
    homeOdds: '-250',
    awayOdds: '+200',
    isLive: false,
    gameTime: '2026-04-20T22:00:00Z',
    winProbability: 71,
    poolValue: '$1.2M',
    volume: 'Medium',
    sharpSentiment: 'Hot',
  },
  {
    id: '6',
    league: 'EPL • MATCHDAY 16',
    sport: 'soccer',
    homeTeam: 'LIVERPOOL',
    awayTeam: 'CHELSEA',
    homeOdds: '-120',
    awayOdds: '+310',
    drawOdds: '+250',
    overUnder: '3.5',
    isLive: true,
    liveStatus: "LIVE 32'",
    homeScore: 1,
    awayScore: 0,
    gameTime: '2026-04-13T15:00:00Z',
    winProbability: 65,
    poolValue: '$2.9M',
    volume: 'High',
    sharpSentiment: 'Hot',
  },
  {
    id: '7',
    league: 'MLB • REGULAR SEASON',
    sport: 'mlb',
    homeTeam: 'YANKEES',
    awayTeam: 'DODGERS',
    homeOdds: '+115',
    awayOdds: '-135',
    spread: '+1.5',
    overUnder: '8.5',
    isLive: false,
    gameTime: '2026-04-14T19:05:00Z',
    winProbability: 47,
    poolValue: '$1.8M',
    volume: 'Medium',
    sharpSentiment: 'Cold',
  },
  {
    id: '8',
    league: 'ATP • FRENCH OPEN',
    sport: 'atp',
    homeTeam: 'DJOKOVIC',
    awayTeam: 'ALCARAZ',
    homeOdds: '+180',
    awayOdds: '-210',
    isLive: true,
    liveStatus: 'LIVE SET 3',
    homeScore: 1,
    awayScore: 1,
    gameTime: '2026-04-13T11:00:00Z',
    winProbability: 42,
    poolValue: '$960K',
    volume: 'Medium',
    sharpSentiment: 'Neutral',
  },
  {
    id: '9',
    league: 'NHL • PLAYOFFS R1',
    sport: 'nhl',
    homeTeam: 'OILERS',
    awayTeam: 'AVALANCHE',
    homeOdds: '-130',
    awayOdds: '+110',
    spread: '-1.5',
    overUnder: '5.5',
    isLive: false,
    gameTime: '2026-04-14T21:00:00Z',
    winProbability: 56,
    poolValue: '$1.4M',
    volume: 'Medium',
    sharpSentiment: 'Neutral',
  },
  {
    id: '10',
    league: 'FORMULA 1 • MONACO GP',
    sport: 'f1',
    homeTeam: 'VERSTAPPEN',
    awayTeam: 'HAMILTON',
    homeOdds: '-160',
    awayOdds: '+350',
    isLive: false,
    gameTime: '2026-04-20T14:00:00Z',
    winProbability: 62,
    poolValue: '$3.2M',
    volume: 'High',
    sharpSentiment: 'Hot',
  },
  {
    id: '11',
    league: 'IPL • MATCH 42',
    sport: 'ipl',
    homeTeam: 'MI',
    awayTeam: 'CSK',
    homeOdds: '+105',
    awayOdds: '-125',
    isLive: true,
    liveStatus: 'LIVE OVER 12.3',
    homeScore: 98,
    awayScore: 0,
    gameTime: '2026-04-13T14:30:00Z',
    winProbability: 48,
    poolValue: '$4.1M',
    volume: 'High',
    sharpSentiment: 'Neutral',
  },
  {
    id: '12',
    league: 'ESPORTS • LOL WORLDS',
    sport: 'esports',
    homeTeam: 'T1',
    awayTeam: 'GEN.G',
    homeOdds: '-140',
    awayOdds: '+120',
    isLive: false,
    gameTime: '2026-04-15T09:00:00Z',
    winProbability: 58,
    poolValue: '$2.1M',
    volume: 'High',
    sharpSentiment: 'Hot',
  },
];

// ---------------------------------------------------------------------------
// Active bets — covers all 4 statuses, single & parlay, with/without cashout
// ---------------------------------------------------------------------------
export const activeBets: ActiveBet[] = [
  {
    id: 'ab1',
    match: deckMatches[0],
    status: 'winning',
    stake: 50,
    odds: '+145',
    potentialPayout: 122.5,
    cashOutValue: 82.1,
  },
  {
    id: 'ab2',
    match: deckMatches[1],
    status: 'in_progress',
    stake: 100,
    odds: '-145',
    potentialPayout: 168.97,
  },
  {
    id: 'ab3',
    match: deckMatches[2],
    status: 'losing',
    stake: 75,
    odds: '+240',
    potentialPayout: 255,
    cashOutValue: 18.75,
  },
  {
    id: 'ab4',
    match: deckMatches[3],
    status: 'almost_done',
    stake: 25,
    odds: '+850',
    potentialPayout: 237.5,
    parlayLegs: 3,
    parlayWon: 2,
  },
  {
    id: 'ab5',
    match: deckMatches[5],
    status: 'winning',
    stake: 200,
    odds: '-120',
    potentialPayout: 366.67,
    cashOutValue: 310.5,
    parlayLegs: 4,
    parlayWon: 3,
  },
  {
    id: 'ab6',
    match: deckMatches[7],
    status: 'in_progress',
    stake: 150,
    odds: '+180',
    potentialPayout: 420.0,
  },
  {
    id: 'ab7',
    match: deckMatches[10],
    status: 'losing',
    stake: 40,
    odds: '+105',
    potentialPayout: 82.0,
    cashOutValue: 12.8,
  },
  {
    id: 'ab8',
    match: deckMatches[11],
    status: 'in_progress',
    stake: 500,
    odds: '-140',
    potentialPayout: 857.14,
    cashOutValue: 520.0,
    parlayLegs: 5,
    parlayWon: 0,
  },
];

// ---------------------------------------------------------------------------
// Settled bets — historical results across win/loss/void/cashout
// ---------------------------------------------------------------------------
export const settledBets: SettledBet[] = [
  {
    id: 'sb1',
    match: deckMatches[0],
    result: 'won',
    market: 'Match Result',
    selection: 'Lakers ML',
    stake: 100,
    odds: '-180',
    payout: 155.56,
    settledAt: '2026-04-12T22:30:00Z',
  },
  {
    id: 'sb2',
    match: deckMatches[1],
    result: 'lost',
    market: 'Spread',
    selection: 'Eagles +3.0',
    stake: 75,
    odds: '+125',
    payout: 0,
    settledAt: '2026-04-12T18:00:00Z',
  },
  {
    id: 'sb3',
    match: deckMatches[2],
    result: 'won',
    market: 'Over/Under',
    selection: 'Over 2.5 Goals',
    stake: 50,
    odds: '-110',
    payout: 95.45,
    settledAt: '2026-04-11T17:00:00Z',
  },
  {
    id: 'sb4',
    match: deckMatches[3],
    result: 'cashout',
    market: 'Match Result',
    selection: 'Warriors ML',
    stake: 200,
    odds: '+130',
    payout: 285.0,
    settledAt: '2026-04-11T21:45:00Z',
  },
  {
    id: 'sb5',
    match: deckMatches[4],
    result: 'won',
    market: 'Method of Victory',
    selection: 'Jones by KO/TKO',
    stake: 60,
    odds: '+175',
    payout: 165.0,
    settledAt: '2026-04-10T23:30:00Z',
  },
  {
    id: 'sb6',
    match: deckMatches[6],
    result: 'lost',
    market: 'Match Result',
    selection: 'Yankees ML',
    stake: 80,
    odds: '+115',
    payout: 0,
    settledAt: '2026-04-10T22:00:00Z',
  },
  {
    id: 'sb7',
    match: deckMatches[2],
    result: 'void',
    market: 'Player to Score',
    selection: 'Haaland Anytime',
    stake: 45,
    odds: '+120',
    payout: 45.0,
    settledAt: '2026-04-09T17:00:00Z',
  },
  {
    id: 'sb8',
    match: deckMatches[0],
    result: 'won',
    market: '3-Leg Parlay',
    selection: 'Lakers ML + Over 224.5 + LeBron 25+ pts',
    stake: 25,
    odds: '+850',
    payout: 237.5,
    settledAt: '2026-04-08T22:30:00Z',
    parlayLegs: 3,
  },
  {
    id: 'sb9',
    match: deckMatches[5],
    result: 'lost',
    market: '4-Leg Parlay',
    selection: 'Liverpool + Man City + Arsenal + Tottenham',
    stake: 30,
    odds: '+1200',
    payout: 0,
    settledAt: '2026-04-07T19:00:00Z',
    parlayLegs: 4,
  },
  {
    id: 'sb10',
    match: deckMatches[8],
    result: 'won',
    market: 'Puck Line',
    selection: 'Oilers -1.5',
    stake: 120,
    odds: '+160',
    payout: 312.0,
    settledAt: '2026-04-06T23:00:00Z',
  },
];

// ---------------------------------------------------------------------------
// Bet slip selections — pre-loaded for the slip builder
// ---------------------------------------------------------------------------
export const sampleSlipSelections: BetSlipSelection[] = [
  { id: 's1', market: 'Match Result', selection: 'Manchester City to Win', odds: 1.45 },
  { id: 's2', market: 'Total Goals', selection: 'Over 3.5', odds: 2.1 },
  { id: 's3', market: 'Player to Score', selection: 'Mohamed Salah', odds: 3.25 },
];

export const parlaySlipSelections: BetSlipSelection[] = [
  { id: 'p1', market: 'NBA - Match Result', selection: 'Lakers ML', odds: 1.56 },
  { id: 'p2', market: 'NBA - Player Prop', selection: 'LeBron 25+ Points', odds: 1.80 },
  { id: 'p3', market: 'EPL - Match Result', selection: 'Man City to Win', odds: 1.45 },
  { id: 'p4', market: 'EPL - Total Goals', selection: 'Over 2.5 Goals', odds: 1.72 },
  { id: 'p5', market: 'NFL - Spread', selection: 'Chiefs -3.0', odds: 1.91 },
];

export const longShotSlipSelections: BetSlipSelection[] = [
  { id: 'ls1', market: 'UFC - Method', selection: 'Miocic by Submission', odds: 8.5 },
  { id: 'ls2', market: 'F1 - Race Winner', selection: 'Hamilton to Win', odds: 4.5 },
  { id: 'ls3', market: 'ATP - Set Betting', selection: 'Djokovic 3-1', odds: 5.0 },
];

// ---------------------------------------------------------------------------
// Transactions — account ledger for deposit/withdrawal/bet history
// ---------------------------------------------------------------------------
export const transactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'deposit',
    amount: 5000.0,
    balance: 14250.0,
    description: 'Visa •••• 4242',
    timestamp: '2026-04-13T08:00:00Z',
  },
  {
    id: 'tx2',
    type: 'bet_placed',
    amount: -500.0,
    balance: 9250.0,
    description: '5-Leg Parlay: T1 + Lakers + Man City + Chiefs + Oilers',
    timestamp: '2026-04-13T09:15:00Z',
    referenceId: 'ab8',
  },
  {
    id: 'tx3',
    type: 'bet_won',
    amount: 237.5,
    balance: 9487.5,
    description: '3-Leg Parlay: Lakers ML + Over 224.5 + LeBron 25+ pts',
    timestamp: '2026-04-08T22:30:00Z',
    referenceId: 'sb8',
  },
  {
    id: 'tx4',
    type: 'cashout',
    amount: 285.0,
    balance: 9772.5,
    description: 'Early cashout: Warriors ML',
    timestamp: '2026-04-11T21:45:00Z',
    referenceId: 'sb4',
  },
  {
    id: 'tx5',
    type: 'bet_lost',
    amount: -75.0,
    balance: 9697.5,
    description: 'Eagles +3.0 (NFL Week 14)',
    timestamp: '2026-04-12T18:00:00Z',
    referenceId: 'sb2',
  },
  {
    id: 'tx6',
    type: 'withdrawal',
    amount: -2000.0,
    balance: 7697.5,
    description: 'Bank Transfer •••• 8891',
    timestamp: '2026-04-10T10:00:00Z',
  },
  {
    id: 'tx7',
    type: 'bonus',
    amount: 350.0,
    balance: 8047.5,
    description: 'Gold Tier Weekly Bonus',
    timestamp: '2026-04-07T00:00:00Z',
  },
  {
    id: 'tx8',
    type: 'deposit',
    amount: 2000.0,
    balance: 10047.5,
    description: 'Apple Pay',
    timestamp: '2026-04-05T14:22:00Z',
  },
  {
    id: 'tx9',
    type: 'bet_placed',
    amount: -200.0,
    balance: 9847.5,
    description: '4-Leg Soccer Parlay',
    timestamp: '2026-04-07T14:00:00Z',
    referenceId: 'ab5',
  },
  {
    id: 'tx10',
    type: 'bet_won',
    amount: 312.0,
    balance: 10159.5,
    description: 'Oilers -1.5 (NHL Playoffs)',
    timestamp: '2026-04-06T23:00:00Z',
    referenceId: 'sb10',
  },
  {
    id: 'tx11',
    type: 'bet_placed',
    amount: -150.0,
    balance: 10009.5,
    description: 'Djokovic ML (ATP French Open)',
    timestamp: '2026-04-13T10:30:00Z',
    referenceId: 'ab6',
  },
  {
    id: 'tx12',
    type: 'bet_placed',
    amount: -40.0,
    balance: 9969.5,
    description: 'MI ML (IPL Match 42)',
    timestamp: '2026-04-13T14:00:00Z',
    referenceId: 'ab7',
  },
];

// ---------------------------------------------------------------------------
// Promotions & bonuses
// ---------------------------------------------------------------------------
export const promotions: Promotion[] = [
  {
    id: 'promo1',
    type: 'odds_boost',
    title: '25% ODDS BOOST',
    description: 'Boosted odds on any NBA Playoff game. Max stake $250.',
    multiplier: 1.25,
    minOdds: 1.5,
    expiresAt: '2026-04-15T23:59:00Z',
    isActive: true,
    sportRestriction: 'nba',
  },
  {
    id: 'promo2',
    type: 'free_bet',
    title: '$50 FREE BET',
    description: 'Place any wager with no risk. Winnings are yours, stake not returned.',
    value: 50,
    expiresAt: '2026-04-20T23:59:00Z',
    isActive: true,
  },
  {
    id: 'promo3',
    type: 'deposit_match',
    title: '100% DEPOSIT MATCH',
    description: 'Deposit $200+ and get it matched. 3x wagering requirement.',
    multiplier: 2.0,
    expiresAt: '2026-04-30T23:59:00Z',
    isActive: true,
  },
  {
    id: 'promo4',
    type: 'parlay_insurance',
    title: 'PARLAY INSURANCE',
    description: 'Miss by one leg on a 4+ leg parlay? Get your stake back as a free bet.',
    minOdds: 1.5,
    expiresAt: '2026-04-17T23:59:00Z',
    isActive: true,
  },
  {
    id: 'promo5',
    type: 'loyalty_reward',
    title: '2X LOYALTY POINTS',
    description: 'Earn double points on all bets placed today. Gold tier and above.',
    multiplier: 2.0,
    expiresAt: '2026-04-13T23:59:00Z',
    isActive: true,
  },
  {
    id: 'promo6',
    type: 'odds_boost',
    title: 'EPL SUPER BOOST',
    description: 'Enhanced odds on all EPL Matchday 16 fixtures.',
    multiplier: 1.3,
    minOdds: 1.4,
    expiresAt: '2026-04-13T23:59:00Z',
    isActive: true,
    sportRestriction: 'soccer',
  },
];

// ---------------------------------------------------------------------------
// Sports catalog for the Market Hub grid
// ---------------------------------------------------------------------------
export const sportsList = [
  { id: 'nba', name: 'NBA', icon: 'basketball', liveCount: 42 },
  { id: 'soccer', name: 'EPL', icon: 'soccer', liveCount: 118 },
  { id: 'ufc', name: 'UFC', icon: 'boxing-glove', liveCount: 8 },
  { id: 'nfl', name: 'NFL', icon: 'football', liveCount: 12 },
  { id: 'mlb', name: 'MLB', icon: 'baseball', liveCount: 15 },
  { id: 'atp', name: 'ATP', icon: 'tennis', liveCount: 29 },
  { id: 'f1', name: 'FORMULA 1', icon: 'car-sports', liveCount: 1 },
  { id: 'nhl', name: 'NHL', icon: 'hockey-sticks', liveCount: 6 },
  { id: 'ipl', name: 'IPL', icon: 'cricket', liveCount: 54 },
  { id: 'pga', name: 'PGA', icon: 'golf', liveCount: 2 },
  { id: 'esports', name: 'ESPORTS', icon: 'controller', liveCount: 215 },
] as const;

// ---------------------------------------------------------------------------
// League-specific market data for the LeagueMarkets screen
// ---------------------------------------------------------------------------
export const leagueMarkets: LeagueMarket[] = [
  {
    id: 'lm_nba',
    sport: 'nba',
    leagueName: 'NBA',
    matches: deckMatches.filter((m) => m.sport === 'nba'),
    outrightOptions: [
      { label: 'Celtics', odds: '2.40' },
      { label: 'Lakers', odds: '5.00' },
      { label: 'Nuggets', odds: '6.50' },
      { label: 'Bucks', odds: '8.00' },
    ],
    trendingProps: [
      'LeBron 30+ Points +220',
      'Curry 5+ Threes +145',
      'Tatum Double-Double -110',
      'Lakers 1H ML +120',
    ],
  },
  {
    id: 'lm_epl',
    sport: 'soccer',
    leagueName: 'EPL',
    matches: deckMatches.filter((m) => m.sport === 'soccer'),
    outrightOptions: [
      { label: 'Man City', odds: '1.85' },
      { label: 'Liverpool', odds: '3.40' },
      { label: 'Arsenal', odds: '5.50' },
      { label: 'Chelsea', odds: '15.00' },
    ],
    trendingProps: [
      'Haaland Anytime Scorer +120',
      'Salah 2+ Shots on Target -110',
      'Both Teams to Score -130',
      'Over 10.5 Corners +105',
    ],
  },
  {
    id: 'lm_nfl',
    sport: 'nfl',
    leagueName: 'NFL',
    matches: deckMatches.filter((m) => m.sport === 'nfl'),
    outrightOptions: [
      { label: 'Chiefs', odds: '3.50' },
      { label: '49ers', odds: '5.00' },
      { label: 'Eagles', odds: '6.00' },
      { label: 'Bills', odds: '7.50' },
    ],
    trendingProps: [
      'Mahomes 3+ TD Passes +150',
      'Kelce Anytime TD +110',
      'Eagles 1H Spread +3.5 -115',
      'Total Sacks Over 4.5 +100',
    ],
  },
  {
    id: 'lm_ufc',
    sport: 'ufc',
    leagueName: 'UFC',
    matches: deckMatches.filter((m) => m.sport === 'ufc'),
    outrightOptions: [
      { label: 'Jones', odds: '1.40' },
      { label: 'Miocic', odds: '3.00' },
    ],
    trendingProps: [
      'Jones by KO/TKO R1 +350',
      'Fight Goes Distance +180',
      'Miocic by Decision +450',
      'Under 2.5 Rounds -120',
    ],
  },
];

// ---------------------------------------------------------------------------
// Drawer navigation
// ---------------------------------------------------------------------------
export const drawerNavItems: readonly {
  label: string;
  icon: string;
  isActive: boolean;
  hasLiveDot?: boolean;
}[] = [
  { label: 'Sports', icon: 'trophy', isActive: true },
  { label: 'Racing', icon: 'flag-checkered', isActive: false },
  { label: 'Bet Live', icon: 'pulse', isActive: false, hasLiveDot: true },
  { label: 'Black Book', icon: 'book', isActive: false },
  { label: 'Deposit', icon: 'wallet', isActive: false },
];

// ---------------------------------------------------------------------------
// Helper: get matches filtered by sport
// ---------------------------------------------------------------------------
export function getMatchesBySport(sport: string): Match[] {
  return deckMatches.filter((m) => m.sport === sport);
}

export function getLiveMatches(): Match[] {
  return deckMatches.filter((m) => m.isLive);
}

export function getUpcomingMatches(): Match[] {
  return deckMatches.filter((m) => !m.isLive);
}

export function getLeagueMarket(sportId: string): LeagueMarket | undefined {
  return leagueMarkets.find((lm) => lm.sport === sportId);
}
