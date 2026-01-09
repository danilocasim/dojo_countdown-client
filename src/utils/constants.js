// ===========================================
// Application Constants
// ===========================================

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const PLANS = [
  {
    id: 'FREE',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out DojoCountdown',
    features: [
      '3 active countdowns',
      '20,000 views/month',
      '30-day max duration',
      'Basic designs',
      'DojoCountdown branding',
    ],
    limitations: [
      'No custom branding',
      'Limited support',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    id: 'BOOTSTRAP',
    name: 'Bootstrap',
    price: 9,
    period: 'month',
    description: 'For growing businesses and creators',
    features: [
      '10 active countdowns',
      '100,000 views/month',
      '90-day max duration',
      'All design variants',
      'Custom colors',
      'Email support',
    ],
    limitations: [
      'DojoCountdown branding',
    ],
    cta: 'Start Bootstrap',
    popular: false,
  },
  {
    id: 'STARTUP',
    name: 'Startup',
    price: 29,
    period: 'month',
    description: 'For teams and scaling businesses',
    features: [
      '50 active countdowns',
      '700,000 views/month',
      '365-day max duration',
      'Remove branding',
      'API access',
      'Priority support',
      'Analytics dashboard',
    ],
    limitations: [],
    cta: 'Start Startup',
    popular: true,
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: 99,
    period: 'month',
    description: 'For large teams with advanced needs',
    features: [
      'Unlimited countdowns',
      '2,800,000 views/month',
      'Unlimited duration',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
};
