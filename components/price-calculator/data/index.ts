export const REGIONS = [
  "North America (NA)",
  "South America (SA)",
  "Europe (EU)",
  "Asia",
];

// Criamos um array de ranks com divisões
export const RANKS_WITH_DIVISIONS = [
  "Bronze 5", "Bronze 4", "Bronze 3", "Bronze 2", "Bronze 1",
  "Silver 5", "Silver 4", "Silver 3", "Silver 2", "Silver 1",
  "Gold 5", "Gold 4", "Gold 3", "Gold 2", "Gold 1",
  "Platinum 5", "Platinum 4", "Platinum 3", "Platinum 2", "Platinum 1",
  "Diamond 5", "Diamond 4", "Diamond 3", "Diamond 2", "Diamond 1",
  "Master 5", "Master 4", "Master 3", "Master 2", "Master 1",
];

// Mantemos o array original para compatibilidade
export const RANKS = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"];

export const CHAMPIONS = [
  "Ahri",
  "Ekko",
  "Yasuo",
  "Darius",
  "Illaoi",
  "Braum",
  "Jinx",
];

export const BOOST_MODES = [
  {
    id: "self-piloted",
    name: "Self-Piloted",
    description: "Our booster plays on your account",
  },
  {
    id: "duo",
    name: "Duo Boost",
    description: "Play together with our booster",
  },
];

export const ADDONS = [
  {
    id: "offline",
    name: "Play Offline",
    description: "Appear offline to your friends while boosting",
    price: 10,
    iconName: "Shield",
  },
  {
    id: "livestream",
    name: "Livestream",
    description: "Watch your booster play on a private stream",
    price: 15,
    iconName: "Video",
  },
  {
    id: "priority",
    name: "Priority Boost",
    description: "Your order will be completed faster",
    price: 20,
    iconName: "Clock",
  },
  {
    id: "coaching",
    name: "Coaching Session",
    description: "1-hour coaching session with your booster",
    price: 30,
    iconName: "GraduationCap",
  },
]; 