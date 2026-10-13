# M-PESA Web Clone

An educational web application clone of the M-PESA mobile money platform. This project is built for training and demonstration purposes only and is not affiliated with Safaricom.

## ⚠️ Important Disclaimer

**This is an educational clone only — Not affiliated with Safaricom.** This application is for training and demonstration purposes only. It does not process real transactions or connect to any payment systems.

## Features

### Core Functionality
- **Authentication System**: PIN-based login with biometric authentication support (WebAuthn)
- **Dashboard**: Overview of account balance, quick actions, and recent transactions
- **Send Money**: Transfer funds to mobile numbers or Pochi la Biashara merchants
- **Withdraw Money**: Withdraw funds at agents, ATMs, or from Ziidi bank accounts
- **Lipa na M-PESA**: Pay bills and buy goods/services
- **Chat Zuri**: AI-powered customer support interface
- **Profile Management**: User profile and settings

### Technical Features
- **Next.js 16.4.0**: Latest version with App Router and Turbopack
- **TypeScript**: Full type safety across the application
- **Tailwind CSS 4**: Modern utility-first CSS framework
- **Theme Support**: Light and dark mode with system preference detection
- **PWA Ready**: Progressive Web App support (currently disabled)
- **Responsive Design**: Mobile-first approach optimized for various screen sizes
- **Context API**: State management for authentication and theme

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page with splash screen
│   ├── login/             # PIN authentication page
│   ├── onboarding/        # First-time user onboarding
│   ├── dashboard/         # Main dashboard
│   ├── send-money/        # Send money interface
│   ├── withdraw-money/    # Withdraw money interface
│   ├── lipa-na-mpesa/     # Lipa na M-PESA payments
│   ├── chat-zuri/         # AI chat support
│   ├── profile/           # User profile
│   ├── biometric/         # Biometric authentication
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles and theme variables
├── components/            # Reusable components
│   ├── SplashScreen.tsx   # App splash screen
│   ├── LogoutCard.tsx     # Logout confirmation
│   ├── ThemeCard.tsx      # Theme selection
│   ├── ServiceWorkerRegistration.tsx
│   └── ui/                # Shadcn UI components
├── contexts/              # React Context providers
│   ├── AuthContext.tsx    # Authentication state management
│   └── ThemeContext.tsx   # Theme state management
└── lib/                   # Utility functions
    └── utils.ts           # Helper functions
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### First-Time Setup
1. On first launch, you'll see the onboarding screens
2. Navigate to the login page
3. Enter any 4-digit PIN (development mode allows any PIN)
4. You'll be logged in with a demo account

### Biometric Authentication
- On supported devices, you can set up biometric authentication
- Uses WebAuthn API for secure biometric login
- Credential ID is stored in localStorage for demo purposes

### Theme Switching
- Toggle between light and dark mode
- Supports system preference detection
- Theme preference is persisted in localStorage

## Key Pages

### Dashboard
- Balance overview with show/hide toggle
- Quick action buttons for common tasks
- Recent transactions list
- Horizontal scrollable balance cards

### Send Money
- Send to mobile numbers
- Send to Pochi la Biashara merchants
- Favorites section for frequent contacts
- Payment method selection (M-PESA, Shiriki Pay)

### Withdraw Money
- Withdraw at Agent
- Withdraw at ATM
- Withdraw from Ziidi (bank transfer)
- Agent and store number inputs

### Login
- 4-digit PIN entry
- Numeric keypad interface
- Biometric authentication option
- Auto-submit when PIN is complete

## Design System

### Colors
- **M-PESA Green**: `#3aa335` (light), `#22C55E` (dark)
- **M-PESA Red**: `#DC2626` (light), `#D7110C` (dark)
- **Background**: `#F5F5F5` (light), `#0D0D0D` (dark)
- **Card**: `#FFFFFF` (light), `#1A1A1A` (dark)

### Typography
- Font family: Poppins, Inter, sans-serif
- Scale: 8dp system (display, h1, title, body, sub, caption, micro)
- Weights: regular (400), medium (500), semibold (600), bold (700)

### Components
- Built with Shadcn UI
- Custom icons (Lucide React + custom SVG icons)
- Responsive grid layouts
- Smooth animations and transitions

## Authentication Context

The `AuthContext` provides:
- User state management
- Login/logout functionality
- Biometric authentication (WebAuthn)
- Balance updates (M-PESA, Mshwari, Fuliza)
- LocalStorage persistence

## Theme Context

The `ThemeContext` provides:
- Light/dark/system theme modes
- System preference detection
- Theme persistence
- Smooth theme transitions
- Meta theme-color updates

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Dependencies

### Core
- `next`: 16.4.0
- `react`: 19.3.0
- `react-dom`: 19.3.0
- `typescript`: 5.x

### UI & Styling
- `tailwindcss`: 4.x
- `@tailwindcss/turbopack`: 4.x
- `shadcn`: 4.21.4
- `framer-motion`: 14.1.0
- `lucide-react`: 1.54.0

### Utilities
- `clsx`: 2.1.1
- `tailwind-merge`: 3.7.0
- `class-variance-authority`: 0.7.1

### Other
- `recharts`: 3.10.1 (charts)
- `sharp`: 0.35.5 (image optimization)
- `@opensourceframework/next-pwa`: 5.6.3 (PWA support)

## Browser Support

- Modern browsers with ES6+ support
- WebAuthn support for biometric authentication
- Responsive design for mobile, tablet, and desktop

## Security Notes

- This is a demo application with mock authentication
- No real transactions are processed
- Credentials are stored in localStorage (not secure for production)
- Biometric data is handled via WebAuthn API
- No sensitive data should be used in this demo

## Future Enhancements

- [ ] Transaction history with pagination
- [ ] Real-time balance updates
- [ ] More payment methods
- [ ] Bill payment templates
- [ ] Airtime and data purchase
- [ ] Savings goals (Mshwari)
- [ ] Fuliza limit management
- [ ] Contact management
- [ ] QR code payments
- [ ] Push notifications

## Contributing

This is an educational project. Feel free to fork and modify for learning purposes.

## License

This project is for educational purposes only. Not affiliated with Safaricom or M-PESA.

## Acknowledgments

- Safaricom PLC for the original M-PESA service
- Next.js team for the excellent framework
- Shadcn for the UI components
- Vercel for hosting and deployment tools
