// ===========================================
// Application Constants
// ===========================================

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  DASHBOARD_NEW: "/dashboard/countdowns/new",
  DASHBOARD_EDIT: "/dashboard/countdowns/:id/edit",
  DASHBOARD_USAGE: "/dashboard/usage",
};

export const PLANS = [
  {
    id: "FREE",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for trying out DojoCountdown",
    features: [
      "3 active countdowns",
      "20,000 views/month",
      "30-day max duration",
      "Basic designs",
      "DojoCountdown branding",
    ],
    limitations: ["No custom branding", "Limited support"],
    cta: "Get Started Free",
    popular: false,
    limits: {
      countdowns: 3,
      views: 20000,
      maxDays: 30,
    },
  },
  {
    id: "BOOTSTRAP",
    name: "Bootstrap",
    price: 9,
    period: "month",
    description: "For growing businesses and creators",
    features: [
      "10 active countdowns",
      "100,000 views/month",
      "90-day max duration",
      "All design variants",
      "Custom colors",
      "Email support",
    ],
    limitations: ["DojoCountdown branding"],
    cta: "Start Bootstrap",
    popular: false,
    limits: {
      countdowns: 10,
      views: 100000,
      maxDays: 90,
    },
  },
  {
    id: "STARTUP",
    name: "Startup",
    price: 29,
    period: "month",
    description: "For teams and scaling businesses",
    features: [
      "50 active countdowns",
      "700,000 views/month",
      "365-day max duration",
      "Remove branding",
      "API access",
      "Priority support",
    ],
    limitations: [],
    cta: "Start Startup",
    popular: true,
    limits: {
      countdowns: 50,
      views: 700000,
      maxDays: 365,
    },
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: 99,
    period: "month",
    description: "For large teams with advanced needs",
    features: [
      "Unlimited countdowns",
      "2,800,000 views/month",
      "Unlimited duration",
      "White-label solution",
      "Dedicated support",
      "Custom integrations",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
    limits: {
      countdowns: Infinity,
      views: 2800000,
      maxDays: Infinity,
    },
  },
];

export const DESIGN_OPTIONS = [
  {
    id: "block",
    name: "Block",
    description: "Square blocks with bold numbers",
    preview: "▪️▪️▪️▪️",
  },
  {
    id: "circle",
    name: "Circle",
    description: "Circular countdown units",
    preview: "⚪⚪⚪⚪",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, simple text style",
    preview: "00:00:00",
  },
  {
    id: "pill",
    name: "Pill",
    description: "Rounded pill-shaped bar",
    preview: "💊",
  },
];

export const COLOR_PRESETS = [
  {
    name: "Classic Black",
    design: "#000000",
    text: "#FFFFFF",
    backdrop: "#FFFFFF",
  },
  {
    name: "Ocean Blue",
    design: "#3498db",
    text: "#FFFFFF",
    backdrop: "#ecf0f1",
  },
  {
    name: "Sunset Red",
    design: "#e94560",
    text: "#FFFFFF",
    backdrop: "#1a1a2e",
  },
  {
    name: "Forest Green",
    design: "#27ae60",
    text: "#FFFFFF",
    backdrop: "#f5f5f5",
  },
  {
    name: "Royal Purple",
    design: "#9b59b6",
    text: "#FFFFFF",
    backdrop: "#f8f9fa",
  },
  { name: "Midnight", design: "#2c3e50", text: "#ecf0f1", backdrop: "#1a1a2e" },
];

export const DEFAULT_STYLE_CONFIG = {
  design: "block",
  colors: {
    design: "#000000",
    text: "#FFFFFF",
    backdrop: "#FFFFFF",
  },
  noBackdrop: false,
};
