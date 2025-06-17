# Pet Food Subscription Frontend

This is the frontend application for the Pet Food Subscription service, built with React and LaunchDarkly for feature flagging.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your LaunchDarkly client ID:
```bash
VITE_LAUNCHDARKLY_CLIENT_ID=your-client-side-id
```

3. Start the development server:
```bash
npm run dev
```

## Features

- React with TypeScript
- LaunchDarkly integration for feature flags
- Emotion for styled components
- React Router for navigation
- Material-UI components

## Project Structure

```
src/
├── components/
│   ├── Hero/
│   │   ├── HeroSection.tsx
│   │   ├── HeroSkeleton.tsx
│   │   └── HeroVariants.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── common/
│       ├── Button.tsx
│       └── Card.tsx
├── hooks/
│   └── useFeatureFlag.ts
├── context/
│   └── LDContext.tsx
├── pages/
│   ├── Home.tsx
│   ├── Plans.tsx
│   └── About.tsx
└── App.tsx
```

## Feature Flags

The application uses LaunchDarkly for feature flagging. The main feature flag is:

- `hero-image-experiment`: Controls which hero image variant is shown (control/treatment)

## Development

To add new feature flags:

1. Create the flag in LaunchDarkly
2. Use the `useFeatureFlag` hook in your component:
```typescript
const { value, isLoading } = useFeatureFlag('your-flag-key', defaultValue);
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Adding a New Hero Image Variation

1. Place your new hero image (e.g., `hero-summer.jpg`) in the `frontend/public/images/` directory.
2. In LaunchDarkly, add a new variation to the `hero-image` flag with the value set to the filename (e.g., `hero-summer.jpg`).
3. Assign users/contexts to the new variation as needed.
4. The React app will automatically use `/images/{flagValue}` as the hero image.

## Fallback/Default Image Logic
- If the flag value is missing or the image file cannot be loaded, the app will show a distinct fallback image (`default-ld-fallback.jpg`).
- When the fallback image is shown for reasons other than LaunchDarkly logic, a banner will appear indicating this.

## Trial Button and Modal
- The visibility of the "Try 7 Days Free" button is controlled by the `show-trial-button` flag in LaunchDarkly.
- When enabled, the button appears in the hero section and opens a modal for trial signup.
