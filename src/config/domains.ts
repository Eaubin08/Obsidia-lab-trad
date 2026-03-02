export const DOMAINS = {
  trading: {
    id: 'trading',
    name: 'Trading',
    icon: '📈',
    description: 'Agent de trading avec gouvernance ERC-8004',
    features: ['Monte Carlo', 'Risk Gates', 'Capital Protection'],
    color: 'emerald'
  },
  banking: {
    id: 'banking',
    name: 'Banking',
    icon: '🏦',
    description: 'Robot décisionnel bancaire autonome',
    features: ['9 Tests Ontologiques', 'Gemini AI', 'ROI Real-time'],
    color: 'blue'
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛒',
    description: 'Sécurité structurelle X-108',
    features: ['Temporal Lock', 'Coherence Scoring', '$X108 Token'],
    color: 'orange'
  }
} as const;

export type DomainId = keyof typeof DOMAINS;
