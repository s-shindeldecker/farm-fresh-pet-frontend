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

### Hero Banner (Image, Text, and Style)

The application uses a single LaunchDarkly JSON flag to control the hero banner image, text, colors, and alignment:

- **Flag key:** `hero-banner-text` (use camelCase `heroBannerText` in React code)
- **Type:** JSON
- **Example value:**

```json
{
  "banner-text": "Fresh, healthy meals delivered for your dog",
  "banner-text-color": "#FFFFFF",
  "sub-banner-text": "Start your pup's journey to better health with our 7-day free trial",
  "sub-banner-text-color": "#FFFFFF",
  "horiz-justification": "center",
  "vert-justification": "top",
  "image-file": "hero-control.jpeg"
}
```

- `banner-text`: Main heading text
- `banner-text-color`: Hex color for the main heading
- `sub-banner-text`: Subheading text
- `sub-banner-text-color`: Hex color for the subheading
- `horiz-justification`: `left`, `right`, or `center` (text alignment)
- `vert-justification`: `top`, `bottom`, or `center` (vertical placement)
- `image-file`: Filename of the hero image in `public/images/`

**To add a new hero variation:**
1. Place your new image in `frontend/public/images/` (e.g., `hero-summer.jpg`).
2. Add a new variation in LaunchDarkly with the desired JSON structure and image filename.
3. Assign users/contexts to the new variation as needed.

### Trial Button
- **Flag key:** `show-trial-button` (use camelCase `showTrialButton` in React code)
- **Type:** Boolean
- Controls the visibility of the "Try 7 Days Free" button in the hero section.

## Fallback/Default Image Logic
- If the `image-file` property is missing, the app will use a default image (`hero-control.jpeg`).
- If the flag is missing or incomplete, sensible defaults are used for all properties.

## Development

To add new feature flags:

1. Create the flag in LaunchDarkly
2. Use the `useFeatureFlag` hook in your component:
```typescript
const { value, isLoading } = useFeatureFlag('yourFlagKey', defaultValue);
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

## Trial Button and Modal
- The visibility of the "Try 7 Days Free" button is controlled by the `show-trial-button` flag in LaunchDarkly.
- When enabled, the button appears in the hero section and opens a modal for trial signup.
