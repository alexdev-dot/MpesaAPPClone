# M-PESA Web Clone - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Authentication System](#authentication-system)
3. [Theme System](#theme-system)
4. [Page Components](#page-components)
5. [State Management](#state-management)
6. [Routing & Navigation](#routing--navigation)
7. [Styling & Design System](#styling--design-system)
8. [API Integration Points](#api-integration-points)
9. [Performance Optimizations](#performance-optimizations)
10. [Deployment](#deployment)

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 16.4.0 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4 with Turbopack
- **UI Components**: Shadcn UI
- **Icons**: Lucide React + Custom SVGs
- **Animations**: Framer Motion
- **Charts**: Recharts

### Project Architecture
```
┌─────────────────────────────────────────┐
│           Next.js App Router            │
├─────────────────────────────────────────┤
│  Context Providers (Auth, Theme)        │
├─────────────────────────────────────────┤
│  Page Components (Route Handlers)       │
├─────────────────────────────────────────┤
│  Reusable Components (UI, Custom)       │
├─────────────────────────────────────────┤
│  Utility Functions & Helpers            │
└─────────────────────────────────────────┘
```

### Data Flow
1. User actions trigger state updates in Context providers
2. Context providers update localStorage for persistence
3. Components re-render based on context changes
4. Navigation between pages handled by Next.js router

## Authentication System

### AuthContext Structure

```typescript
interface User {
  phoneNumber: string;
  name: string;
  email: string;
  balance: number;
  mshwariBalance: number;
  mshwariSavings: number;
  airtimeBalance: number;
  dataBalance: string;
  smsBalance: number;
  bongaPoints: number;
  fulizaBalance: number;
  fulizaLimit: number;
}
```

### Authentication Flow

#### PIN Authentication
1. User enters 4-digit PIN on login page
2. PIN is validated (accepts any PIN in dev mode)
3. On success, user object is created and stored
4. User is redirected to dashboard
5. Session persists in localStorage

#### Biometric Authentication (WebAuthn)
1. Check if WebAuthn is available
2. If not registered, prompt user to register
3. Registration creates public key credential
4. Credential ID stored in localStorage
5. Subsequent logins use credential for authentication
6. On success, user is logged in

### Security Considerations
- ⚠️ Demo mode: Any PIN is accepted
- ⚠️ Credentials stored in localStorage (not production-ready)
- ✅ WebAuthn provides secure biometric authentication
- ✅ No sensitive data is transmitted
- ⚠️ No server-side validation

### Available Methods
```typescript
login(phoneNumber: string, pin: string): boolean
loginWithBiometric(): Promise<boolean>
registerBiometric(): Promise<boolean>
isBiometricAvailable(): boolean
hasBiometricRegistered(): boolean
logout(): void
updateBalance(amount: number): void
updateMshwariBalance(amount: number): void
updateMshwariSavings(amount: number): void
```

## Theme System

### ThemeContext Structure

```typescript
type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: "light" | "dark";
}
```

### Theme Resolution Logic
1. Check if theme is set in localStorage
2. If "system", check `prefers-color-scheme` media query
3. Apply effective theme to document class
4. Update meta theme-color for browser UI
5. Listen for system theme changes when in "system" mode

### CSS Custom Properties

#### Light Mode
```css
--background: #F5F5F5
--foreground: #1A1A1A
--card: #FFFFFF
--mpesa-green: #3aa335
--mpesa-red: #DC2626
```

#### Dark Mode
```css
--background: #0D0D0D
--foreground: #F5F5F5
--card: #1A1A1A
--mpesa-green: #22C55E
--mpesa-red: #D7110C
```

### Theme Transitions
- 150ms ease-out transition for background and color
- Prevents flash of unstyled content (FOUC)
- Meta theme-color updates for consistent browser UI

## Page Components

### Splash Screen (`/`)
- Displays M-PESA logo for 3.5 seconds
- Checks if user has seen onboarding
- Redirects to onboarding or login accordingly
- Smooth fade-out animation

### Onboarding (`/onboarding`)
- 2-slide carousel introducing features
- Phone mockup images
- Progress dot indicators
- "Get Started" button on final slide
- Sets `has_seen_onboarding` flag in localStorage

### Login (`/login`)
- 4-digit PIN entry with numeric keypad
- Profile display with masked phone number
- Biometric authentication option (if available)
- Auto-submit when PIN is complete
- Error handling for invalid PIN
- Validates PIN length (must be 4 digits)

### Dashboard (`/dashboard`)
- Time-based greeting (morning/afternoon/evening)
- Horizontal scrollable balance cards
- Quick action grid (4x2 layout)
- Recent transactions list
- Frequent contacts section
- Help card with auto-dismiss (3 seconds)
- Balance visibility toggle
- QR code card (collapses on scroll)

### Send Money (`/send-money`)
- Tabbed interface (Mobile / Pochi la Biashara)
- Favorites section for quick access
- Phone number input with user lookup
- Amount input with balance display
- Payment method selection (M-PESA / Shiriki Pay)
- QR code scanner button
- Continue button with validation

### Withdraw Money (`/withdraw-money`)
- Tabbed interface (Agent / ATM / From Ziidi)
- Agent number input with QR scanner
- Store number input (for agent withdrawals)
- Amount input with balance display
- Balance and Fuliza information
- Continue button with validation

### Lipa na M-PESA (`/lipa-na-mpesa`)
- Payment method selection
- Merchant/ bill number input
- Amount input
- Account selection
- Payment confirmation

### Chat Zuri (`/chat-zuri`)
- AI-powered chat interface
- Message bubbles with proper styling
- User and bot message differentiation
- Input field with send button
- Chat history display

### Profile (`/profile`)
- User information display
- Account settings
- Theme selection
- Logout option
- Biometric settings

### Biometric (`/biometric`)
- Biometric registration flow
- WebAuthn credential creation
- Success/failure feedback
- Redirect to login after registration

## State Management

### Context-based State
The application uses React Context for global state management:

#### AuthContext
- User authentication state
- User data (balances, profile)
- Biometric credentials
- Session persistence

#### ThemeContext
- Current theme (light/dark/system)
- Theme preference persistence
- System theme detection
- Meta tag updates

### Local State
- Form inputs (phone numbers, amounts, PINs)
- UI state (active tabs, modals, dropdowns)
- Temporary data (transaction drafts)

### Persistence Strategy
- User data: localStorage (`mpesa_user`)
- Biometric credentials: localStorage (`biometric_credential_id`)
- Onboarding status: localStorage (`has_seen_onboarding`)
- Theme preference: localStorage (`theme`)
- Balance visibility: localStorage (`balanceVisible`)

## Routing & Navigation

### Route Structure
```
/                    → Splash screen → redirects to onboarding or login
/onboarding          → First-time user onboarding
/login               → PIN authentication
/dashboard           → Main dashboard
/send-money          → Send money interface
/withdraw-money      → Withdraw money interface
/lipa-na-mpesa       → Lipa na M-PESA payments
/chat-zuri           → AI chat support
/profile             → User profile
/biometric           → Biometric setup
```

### Navigation Patterns
- Programmatic navigation using `useRouter()` hook
- Back buttons for navigation hierarchy
- Protected routes (redirect to login if not authenticated)
- Query parameters for tab selection (e.g., `?tab=pochi`)

### Route Protection
```typescript
useEffect(() => {
  if (!isAuthenticated || !user) {
    router.push("/login");
  }
}, [isAuthenticated, user, router]);
```

## Styling & Design System

### Tailwind CSS Configuration
- Version 4 with Turbopack
- Custom theme via CSS variables
- Shadcn UI integration
- Custom animations via `tw-animate-css`

### Design Tokens

#### Colors
- Primary: M-PESA Green (#3aa335 / #22C55E)
- Accent: M-PESA Red (#DC2626 / #D7110C)
- Neutral: Gray scale (#F5F5F5 to #0D0D0D)
- Semantic: Success, warning, error variants

#### Typography
- Font: Poppins, Inter, sans-serif
- Scale: 8dp system (12px to 32px)
- Weights: 400, 500, 600, 700
- Line heights: Optimized for readability

#### Spacing
- Base unit: 4px (0.25rem)
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Responsive breakpoints: sm, md, lg, xl

#### Border Radius
- sm: 0.375rem
- md: 0.5rem
- lg: 0.625rem (default)
- xl: 0.875rem
- 2xl: 1.125rem
- 3xl: 1.375rem
- 4xl: 1.625rem

### Custom Components

#### Icon System
- Lucide React for standard icons
- Custom SVG icons for brand-specific elements
- Pata More, Shopping Basket, Home Internet, Tuunza Mapata icons
- Color filters for icon theming

#### Button Styles
- Primary: M-PESA green background
- Secondary: Gray/neutral background
- Ghost: Transparent with hover effect
- Disabled: Reduced opacity, no cursor

#### Input Styles
- Rounded corners (lg radius)
- Border changes on focus (M-PESA green)
- Active state indicator
- Error state styling

### Animations
- Splash screen fade-out (700ms)
- Help card bounce (2s, infinite)
- Fade-in for messages (300ms)
- Scale effect on button press (0.98)
- Loading pulse for skeleton screens

## API Integration Points

### Current State
The application currently uses mock data and localStorage. No real API integrations are implemented.

### Planned Integration Points

#### Authentication API
```typescript
POST /api/auth/login
POST /api/auth/biometric/register
POST /api/auth/biometric/verify
POST /api/auth/logout
```

#### Transaction API
```typescript
POST /api/transactions/send
POST /api/transactions/withdraw
POST /api/transactions/paybill
GET /api/transactions/history
GET /api/transactions/:id
```

#### Balance API
```typescript
GET /api/balance
GET /api/balance/mshwari
GET /api/balance/fuliza
```

#### User API
```typescript
GET /api/user/profile
PUT /api/user/profile
GET /api/user/contacts
POST /api/user/contacts
```

#### Chat API
```typescript
POST /api/chat/message
GET /api/chat/history
```

### API Client Structure
```typescript
// Planned implementation
const apiClient = {
  auth: { login, logout, biometric },
  transactions: { send, withdraw, paybill, history },
  balance: { get, mshwari, fuliza },
  user: { profile, contacts },
  chat: { message, history }
};
```

## Performance Optimizations

### Next.js Optimizations
- Turbopack for faster builds
- Static page generation (SSG)
- Image optimization with Next.js Image component
- Automatic code splitting
- Font optimization with next/font

### CSS Optimizations
- Tailwind CSS purging in production
- CSS custom properties for theme switching
- Minimal CSS bundle size
- Critical CSS inlining

### Component Optimizations
- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values
- Lazy loading for heavy components

### Asset Optimizations
- SVG icons (scalable, small file size)
- Optimized images with sharp
- WebP format support
- Lazy loading for images

### Runtime Optimizations
- Debounced scroll handlers
- Virtual scrolling for long lists
- Themed CSS variables for instant theme switching
- LocalStorage caching

## Deployment

### Build Process
```bash
npm run build  # Creates optimized production build
npm start      # Starts production server
```

### Environment Variables
Create `.env.local` for environment-specific configuration:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=M-PESA Clone
```

### Vercel Deployment
1. Connect repository to Vercel
2. Configure build settings (if needed)
3. Deploy automatically on push to main branch
4. Environment variables configured in Vercel dashboard

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Performance Monitoring
- Consider adding analytics (Vercel Analytics, Plausible)
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)
- User feedback collection

## Testing Strategy

### Unit Testing (Planned)
- Jest for component testing
- React Testing Library for user interactions
- Context provider testing

### Integration Testing (Planned)
- End-to-end testing with Playwright
- API integration testing
- Authentication flow testing

### Manual Testing Checklist
- [ ] Login with PIN
- [ ] Biometric authentication
- [ ] Theme switching
- [ ] All page navigation
- [ ] Form validations
- [ ] Responsive design
- [ ] Dark mode compatibility
- [ ] Mobile responsiveness

## Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- WebAuthn API (for biometrics)
- LocalStorage API
- CSS Custom Properties

### Progressive Enhancement
- Graceful degradation for older browsers
- Fallback for unsupported features
- Polyfills if needed

## Security Best Practices

### Current Implementation
- ⚠️ Demo mode: No real security
- ⚠️ localStorage for credentials (not secure)
- ✅ Input validation on client side
- ✅ XSS protection via React
- ⚠️ No CSRF protection needed (no server)

### Production Requirements
- Implement server-side authentication
- Use secure HTTP-only cookies
- Add CSRF protection
- Implement rate limiting
- Add input sanitization
- Use HTTPS only
- Implement proper session management
- Add audit logging
- Secure WebAuthn implementation
- Regular security audits

## Troubleshooting

### Common Issues

#### Build Errors
- Clear .next cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (must be 18+)

#### Runtime Errors
- Check browser console for errors
- Verify localStorage is enabled
- Check network tab for failed requests
- Ensure all assets are in public folder

#### Styling Issues
- Verify Tailwind CSS is loaded
- Check CSS custom properties
- Verify theme class on html element
- Check for CSS conflicts

#### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check WebAuthn support in browser
- Verify credential ID format
- Check browser permissions

## Development Workflow

### Feature Development
1. Create feature branch
2. Implement component/page
3. Add type definitions
4. Style with Tailwind
5. Test locally
6. Create pull request
7. Code review
8. Merge to main

### Code Style
- Use TypeScript for all new code
- Follow existing patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### Git Commit Messages
```
feat: add send money page
fix: resolve login validation bug
style: improve button hover states
refactor: extract auth logic to context
docs: update README with new features
```

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [WebAuthn Guide](https://webauthn.guide/)

### Design Resources
- [M-PESA Brand Guidelines](https://www.safaricom.co.ke/)
- [Shadcn UI Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)

### Learning Resources
- [Next.js Learn](https://nextjs.org/learn)
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Best Practices](https://github.com/typescript-cheatsheets/react)
