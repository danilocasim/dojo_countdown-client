# DojoCountdown Client

A React-based web application for creating and managing dynamic countdown timer images. This frontend interfaces with the DojoCountdown API to provide a complete countdown timer management solution.

| Resource           | Link                                                                       |
| ------------------ | -------------------------------------------------------------------------- |
| Backend Repository | [dojo_countdown-api](https://github.com/danilocasim/dojo-countdown-api)    |
| Live Application   | [dojocountdown.vercel.app](https://dojocountdown.vercel.app)               |
| Live API           | [dojo-countdown-api.onrender.com](https://dojo-countdown-api.onrender.com) |

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Components](#components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

DojoCountdown Client is a single-page application that enables users to create, customize, and manage countdown timer images. The application provides an intuitive interface for configuring countdown styles, previewing results in real-time, and generating embed codes for use in emails and websites.

## Features

### Public Pages

- **Landing Page**: Marketing page with hero section, features overview, and pricing plans
- **Authentication**: User registration and login with JWT-based authentication

### Dashboard

- **Countdown Management**: Create, edit, and delete countdown timers
- **Style Editor**: Visual configuration of countdown appearance
  - Multiple design variants (Block, Circle, Minimal, Pill)
  - Custom color selection with preset palettes
  - Timezone-aware date/time configuration
- **Live Preview**: Real-time preview of countdown appearance
- **Embed Code Generator**: Generate HTML, Markdown, and URL embed codes
- **Usage Monitoring**: Track countdown views and plan limits

## Technology Stack

| Component        | Technology        |
| ---------------- | ----------------- |
| Framework        | React 18          |
| Language         | JavaScript (ES6+) |
| Styling          | Tailwind CSS      |
| Routing          | React Router v6   |
| HTTP Client      | Fetch API         |
| State Management | React Context API |
| Build Tool       | Create React App  |

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- DojoCountdown API running (locally or hosted)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dojo-countdown-client.git
cd dojo-countdown-client
```

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration:

```bash
cp .env.example .env
```

4. Update `.env` with your API URL:

```env
REACT_APP_API_URL=http://localhost:3000
```

## Configuration

### Environment Variables

| Variable            | Description          | Required | Default                 |
| ------------------- | -------------------- | -------- | ----------------------- |
| `REACT_APP_API_URL` | Backend API base URL | Yes      | `http://localhost:3000` |

### Tailwind Configuration

The application uses a custom Tailwind configuration with extended colors:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f4',
          500: '#e94560',
          600: '#d42a4c',
          // ... full palette
        },
        dark: {
          700: '#3f4046',
          800: '#1a1a2e',
          900: '#16161d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## Running Locally

### Development Mode

```bash
npm start
```

The application will start at `http://localhost:3001` (or the next available port).

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Running Tests

```bash
npm test
```

## Project Structure

```
dojo-countdown-client/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/
│   │   ├── client.js           # Fetch-based HTTP client
│   │   ├── countdowns.js       # Countdown API methods
│   │   ├── usage.js            # Usage API methods
│   │   └── render.js           # Render URL helpers
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
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── countdown/          # Countdown editor components
│   │   │   ├── CountdownForm.jsx
│   │   │   ├── CountdownList.jsx
│   │   │   ├── CountdownCard.jsx
│   │   │   ├── DesignSelector.jsx
│   │   │   ├── ColorPicker.jsx
│   │   │   ├── TimezoneSelect.jsx
│   │   │   ├── LivePreview.jsx
│   │   │   └── EmbedCodeGenerator.jsx
│   │   ├── forms/              # Authentication forms
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── landing/            # Landing page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Pricing.jsx
│   │   │   └── PricingCard.jsx
│   │   └── usage/              # Usage display components
│   │       ├── UsageMeter.jsx
│   │       └── UsageCard.jsx
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state
│   ├── hooks/
│   │   ├── useAuth.js          # Auth context consumer
│   │   ├── useLogin.js         # Login API hook
│   │   ├── useSignup.js        # Signup API hook
│   │   ├── useLogout.js        # Logout API hook
│   │   ├── useFetchUser.js     # User data hook
│   │   ├── useCountdowns.js    # Countdowns list hook
│   │   ├── useCountdown.js     # Single countdown hook
│   │   ├── useUsage.js         # Usage data hook
│   │   ├── useFormState.js     # Form state management
│   │   ├── useDebounce.js      # Debounce utility
│   │   └── useClipboard.js     # Clipboard utility
│   ├── pages/
│   │   ├── Landing.jsx         # Public landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── Signup.jsx          # Registration page
│   │   ├── Dashboard.jsx       # Dashboard home
│   │   ├── CountdownNew.jsx    # Create countdown
│   │   ├── CountdownEdit.jsx   # Edit countdown
│   │   └── Usage.jsx           # Usage statistics
│   ├── utils/
│   │   ├── constants.js        # App constants
│   │   ├── validators.js       # Form validation
│   │   └── timezones.js        # Timezone utilities
│   ├── App.jsx                 # Root component
│   ├── index.jsx               # Entry point
│   └── index.css               # Global styles
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Architecture

### Component Hierarchy

```
App
├── AuthProvider
│   └── BrowserRouter
│       ├── Landing (/)
│       ├── Login (/login)
│       ├── Signup (/signup)
│       └── DashboardLayout (/dashboard/*)
│           ├── Dashboard (/dashboard)
│           ├── CountdownNew (/dashboard/countdowns/new)
│           ├── CountdownEdit (/dashboard/countdowns/:id/edit)
│           └── Usage (/dashboard/usage)
```

### Data Flow

```
User Action
    │
    ▼
Component (onClick handler)
    │
    ▼
Custom Hook (useLogin, useCountdown, etc.)
    │
    ▼
API Client (fetch with auth)
    │
    ▼
Backend API
    │
    ▼
Response
    │
    ▼
Hook State Update
    │
    ▼
Component Re-render
```

## Components

### UI Components

Reusable, stateless components following a consistent API pattern:

**Button**

```jsx
<Button
  variant='primary|secondary|outline|ghost|danger'
  size='sm|md|lg|xl'
  loading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  onClick={handler}
>
  Label
</Button>
```

**Input**

```jsx
<Input
  label='Field Label'
  name='fieldName'
  type='text|email|password'
  value={value}
  error={errorMessage}
  touched={boolean}
  onChange={handler}
  onBlur={handler}
  required={boolean}
/>
```

**Alert**

```jsx
<Alert
  variant='success|error|warning|info'
  dismissible={boolean}
  onDismiss={handler}
>
  Message content
</Alert>
```

### Form Components

The countdown editor uses specialized form components:

- **DesignSelector**: Visual selection of countdown design variants
- **ColorPicker**: Hex color input with preset swatches
- **TimezoneSelect**: Dropdown with common timezone options
- **LivePreview**: Real-time countdown image preview with debouncing
- **EmbedCodeGenerator**: Copy-to-clipboard embed code output

## State Management

### Authentication Context

The `AuthContext` provides global authentication state:

```jsx
const {
  user, // Current user object
  isLoading, // Initial auth check in progress
  isAuthenticated, // Boolean auth status
  setAuthUser, // Update user after login/signup
  logout, // Clear auth state
} = useAuth();
```

### Custom Hooks Pattern

API interactions follow a consistent hook pattern:

```jsx
const {
  data, // Response data
  isLoading, // Request in progress
  error, // Error message
  execute, // Trigger the request
  clearError, // Clear error state
} = useCustomHook();
```

## API Integration

### HTTP Client

The API client (`src/api/client.js`) provides:

- Automatic JWT token injection
- Token refresh on 401 responses
- Centralized error handling
- Request/response interceptors

```javascript
// Usage
import { api } from './api/client';

const response = await api.get('/api/v1/countdowns');
const data = await response.json();
```

### API Modules

Dedicated modules for each resource:

```javascript
// Countdowns
import countdownsApi from './api/countdowns';
await countdownsApi.getAll();
await countdownsApi.create(data);
await countdownsApi.update(id, data);
await countdownsApi.delete(id);

// Usage
import usageApi from './api/usage';
await usageApi.getCurrent();
await usageApi.getHistory(months);

// Render URLs
import { renderApi } from './api/render';
const imageUrl = renderApi.getImageUrl(countdownId);
const embedCodes = renderApi.getEmbedCodes(countdownId);
```

## Styling

### Tailwind CSS Approach

The application uses Tailwind CSS with utility-first patterns:

- **Responsive Design**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **Custom Colors**: Extended palette in `tailwind.config.js`
- **Component Classes**: Reusable patterns in `index.css`

### Responsive Breakpoints

| Breakpoint | Width     | Target           |
| ---------- | --------- | ---------------- |
| Default    | < 640px   | Mobile           |
| `sm:`      | >= 640px  | Mobile landscape |
| `md:`      | >= 768px  | Tablets          |
| `lg:`      | >= 1024px | Desktops         |
| `xl:`      | >= 1280px | Large screens    |

### Custom Component Classes

```css
/* src/index.css */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 
           font-medium rounded-lg transition-all duration-200;
  }

  .btn-primary {
    @apply btn bg-primary-500 text-white hover:bg-primary-600;
  }

  .input {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
}
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   - `REACT_APP_API_URL`: Your backend API URL
3. Deploy

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add environment variables in site settings

### Manual Deployment

```bash
# Build the application
npm run build

# The build/ directory contains static files
# Deploy to any static hosting service
```

### Environment-Specific Configuration

For different environments, create separate `.env` files:

```
.env.development    # Local development
.env.production     # Production build
```

## Troubleshooting

### CORS Errors

Ensure the backend API has CORS configured for your frontend URL:

```javascript
// Backend CORS configuration
app.use(
  cors({
    origin: 'https://your-frontend-url.com',
    credentials: true,
  }),
);
```

### Authentication Issues

1. Verify `REACT_APP_API_URL` is correct
2. Check browser console for token-related errors
3. Clear localStorage and re-authenticate:

```javascript
localStorage.clear();
```

### Live Preview Not Loading

1. Verify the countdown exists in the database
2. Check the render endpoint is accessible
3. Inspect network requests for errors

### Styles Not Applying

1. Verify Tailwind configuration includes all source files
2. Restart the development server after config changes
3. Check for CSS class typos

### Build Failures

1. Clear node_modules and reinstall:

```bash
   rm -rf node_modules package-lock.json
   npm install
```

2. Verify all imports resolve correctly
3. Check for circular dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Internet Explorer is not supported.

## License

This project is proprietary software. All rights reserved.

---

For questions or support, contact the development team.
