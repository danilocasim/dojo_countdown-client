# DojoCountdown Frontend MVP

A React-based frontend for DojoCountdown - a SaaS platform for generating dynamic countdown timer images for email marketing.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- DojoCountdown backend running on `http://localhost:3000`

### Installation

```bash
# 1. Extract the zip file and navigate to the directory
cd dojo-countdown-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at `http://localhost:3001` (or next available port).

## 📁 Project Structure

```
dojo-countdown-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── api/
│   │   └── client.js           # Centralized API client
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Alert.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Spinner.jsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Container.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── landing/            # Landing page sections
│   │   │   ├── Features.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Pricing.jsx
│   │   │   └── PricingCard.jsx
│   │   └── forms/              # Form components
│   │       ├── LoginForm.jsx
│   │       └── SignupForm.jsx
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── hooks/
│   │   ├── useApi.js           # API request hook
│   │   ├── useAuth.js          # Auth context hook
│   │   └── useForm.js          # Form handling hook
│   ├── pages/
│   │   ├── Landing.jsx         # Landing page
│   │   ├── Login.jsx           # Login page
│   │   └── Signup.jsx          # Signup page
│   ├── utils/
│   │   ├── constants.js        # App constants
│   │   └── validators.js       # Form validators
│   ├── App.jsx                 # Main app component
│   ├── index.jsx               # Entry point
│   └── index.css               # Tailwind CSS
├── .env                        # Environment variables
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## ⚙️ Configuration

### Environment Variables

Edit `.env` to configure the API URL:

```env
REACT_APP_API_URL=http://localhost:3000
```

## 🎨 Tailwind CSS

This project uses Tailwind CSS with a custom theme. The configuration includes:

- **Primary colors**: Pink/red accent (#e94560)
- **Dark colors**: Dark blue/gray for backgrounds (#1a1a2e)
- **Inter font family**: Clean, modern typography

### Responsive Breakpoints

```
sm:  640px   → Mobile landscape
md:  768px   → Tablets
lg:  1024px  → Desktops
xl:  1280px  → Large desktops
2xl: 1536px  → Extra large screens
```

## 📱 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Marketing page with hero, features, pricing |
| `/login` | Login | User authentication |
| `/signup` | Signup | User registration |
| `/dashboard` | Dashboard | Placeholder (Phase 7) |

## 🔐 Authentication

The app uses JWT-based authentication:

- **Access Token**: Short-lived (15m), stored in localStorage
- **Refresh Token**: Long-lived (7d), used to get new access tokens
- **Auto-refresh**: Tokens are automatically refreshed on 401 errors

## 🧪 API Integration

The frontend connects to these backend endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register new user |
| POST | `/api/v1/auth/login` | Authenticate user |
| POST | `/api/v1/auth/logout` | Invalidate session |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/users/me` | Get current user |

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Client-side routing

### Development
- `tailwindcss` - Utility-first CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

## 🚀 Production Build

```bash
# Create optimized build
npm run build

# The build folder contains static files ready for deployment
```

## 🔧 Troubleshooting

### CORS Errors
Make sure the backend has CORS enabled for `http://localhost:3001`.

### API Connection Failed
1. Verify the backend is running on the correct port
2. Check `REACT_APP_API_URL` in `.env`
3. Restart the dev server after changing `.env`

### Tailwind Styles Not Working
```bash
# Rebuild Tailwind CSS
npm run build
```

## 📈 Next Steps (Phase 7)

- [ ] Dashboard layout
- [ ] Countdown list view
- [ ] Create/edit countdown forms
- [ ] Usage statistics display
- [ ] Settings page

## 📄 License

MIT License - feel free to use this for your own projects.
# dojo_countdown-client
