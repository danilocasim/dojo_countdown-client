# 🎨 DojoCountdown Client

> Modern React frontend for the DojoCountdown dynamic countdown timer service

[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245)](https://reactrouter.com/)

## 📖 Overview

The DojoCountdown client is a modern, responsive React application that provides an intuitive interface for creating and managing dynamic countdown timer images. Built with React 18, Tailwind CSS, and React Router, it offers a seamless user experience for email marketers and web developers.

### ✨ Key Features

- **🔐 Authentication** - Secure signup/login with JWT
- **⏱️ Countdown Management** - Create, edit, and delete countdowns
- **🎨 Live Preview** - Real-time countdown preview
- **📊 Usage Dashboard** - Track views and plan limits
- **💎 Plan Management** - Visualize plan features and limits
- **📱 Responsive Design** - Works on all devices
- **🎯 Intuitive UI** - Clean, modern interface
- **⚡ Fast & Optimized** - Built with performance in mind

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- DojoCountdown API running (default: `http://localhost:3000`)

### Installation

1. **Clone the repository**

   ```bash
   cd dojo-countdown-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The app will open at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

Built files will be in the `build/` directory.

## 🏗️ Project Structure

```
src/
├── App.jsx                    # Main app component
├── index.jsx                  # Entry point
├── index.css                  # Global styles
├── api/                       # API integration
│   ├── client.js             # Axios client setup
│   ├── countdowns.js         # Countdown API calls
│   ├── render.js             # Render API calls
│   └── usage.js              # Usage API calls
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── Alert.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Spinner.jsx
│   │   └── UpgradeNotice.jsx
│   ├── layout/               # Layout components
│   │   ├── Container.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── landing/              # Landing page sections
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Pricing.jsx
│   │   └── HowItWorks.jsx
│   ├── dashboard/            # Dashboard components
│   │   ├── DashboardLayout.jsx
│   │   └── DashboardNav.jsx
│   ├── countdown/            # Countdown components
│   │   ├── CountdownCard.jsx
│   │   ├── CountdownForm.jsx
│   │   ├── CountdownList.jsx
│   │   └── CountdownPreview.jsx
│   ├── usage/                # Usage components
│   │   ├── UsageCard.jsx
│   │   └── UsageMeter.jsx
│   └── forms/                # Form components
│       ├── LoginForm.jsx
│       └── SignupForm.jsx
├── context/
│   └── AuthContext.jsx       # Authentication context
├── hooks/
│   ├── useAuth.js           # Auth hook
│   ├── useCountdowns.js     # Countdowns hook
│   └── useUsage.js          # Usage hook
├── pages/                    # Page components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── CountdownNew.jsx
│   ├── CountdownEdit.jsx
│   └── Usage.jsx
└── utils/
    ├── constants.js          # App constants
    └── helpers.js            # Helper functions
```

## 🎯 Features

### Authentication

- **Sign Up**: Create new account with email/password
- **Login**: Secure authentication with JWT
- **Auto-logout**: Automatic redirect on session expiry
- **Protected Routes**: Authentication required for dashboard

### Countdown Management

- **Create Countdowns**: Easy-to-use form with validation
- **Edit Countdowns**: Update title, date, and styles
- **Delete Countdowns**: Remove unwanted timers
- **Live Preview**: See your countdown before saving
- **Copy Embed Code**: One-click copy HTML/Markdown

### Usage Tracking

- **Current Usage**: View month-to-date statistics
- **Usage History**: 6-month historical data
- **Quota Warnings**: Visual alerts when approaching limits
- **Plan Limits**: Clear display of plan capabilities

### Upgrade Notices

- **Contextual Prompts**: Shown when limits are reached
- **Plan Comparison**: See features of next tier
- **Compact Warnings**: Non-intrusive notifications

## 🎨 Styling

The app uses Tailwind CSS for styling with a custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... custom brand colors
        },
      },
    },
  },
};
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root:

```bash
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development
```

### API Client

The API client is configured in `src/api/client.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📱 Pages

### Landing Page

- Hero section with CTA
- Features showcase
- Pricing table
- How it works
- Footer with links

### Dashboard

- Overview statistics
- Active countdowns list
- Usage meter
- Quick actions
- Empty states

### Countdown Management

- Create new countdown
- Edit existing countdown
- Live preview
- Embed code generation
- Style customization

### Usage Page

- Current plan details
- Usage statistics
- Historical data
- Upgrade options

## 🎨 Components

### UI Components

All reusable UI components follow consistent design patterns:

```jsx
// Button.jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>

// Alert.jsx
<Alert variant="success" dismissible>
  Countdown created successfully!
</Alert>

// EmptyState.jsx
<EmptyState
  icon="clock"
  title="No countdowns yet"
  actionLabel="Create First Countdown"
  actionTo="/dashboard/countdowns/new"
/>
```

### Custom Hooks

```jsx
// useAuth.js
const { user, login, logout, isLoading } = useAuth();

// useCountdowns.js
const { countdowns, fetchCountdowns, createCountdown, deleteCountdown } =
  useCountdowns();

// useUsage.js
const { usage, fetchUsage, isLoading } = useUsage();
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables
5. Deploy

### Build for Static Hosting

```bash
npm run build
```

Upload the `build/` directory to any static hosting service:

- AWS S3 + CloudFront
- GitHub Pages
- Surge.sh
- Firebase Hosting

## 🔒 Security

- ✅ JWT token storage in localStorage
- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ Input validation
- ✅ XSS prevention
- ✅ CORS headers

## 🎭 Demo Mode

The app includes demo credentials for testing:

- Email: `demo@dojocountdown.com`
- Password: `Demo1234`

## 📊 Performance

- Code splitting with React.lazy()
- Optimized images
- Lazy loading
- Memoized components
- Efficient re-renders

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 💬 Support

- 📧 Email: support@dojocountdown.com
- 📚 Documentation: [docs.dojocountdown.com](https://docs.dojocountdown.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/dojo-countdown/issues)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Heroicons for the icon set
- Community contributors

---

Made with ❤️ by the DojoCountdown Team
