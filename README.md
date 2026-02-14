# Valentine's Day Interactive Website

A romantic, interactive single-page application with a 4-step flow featuring passkey validation, announcement screen, and a flower shop bouquet builder.

## Features

- **Step 1 & 2**: Passkey screens with date input validation (mm/dd/yy format)
- **Step 3**: Announcement screen with smooth animations
- **Step 4**: Interactive flower shop where users can build custom bouquets
- Progress persistence using localStorage
- Smooth transitions and animations using framer-motion
- Confetti effects on correct answers
- Image export functionality for bouquets

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Canvas Confetti
- html2canvas

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  components/
    PasskeyScreen.tsx      # Reusable passkey input component
    RevealScreen.tsx        # Announcement screen
    FlowerShopScreen.tsx    # Main flower shop builder
    BouquetPreview.tsx      # Bouquet rendering component
    FlowerIcon.tsx          # SVG flower icons
  hooks/
    useLocalStorageProgress.ts  # Progress persistence hook
  utils/
    dateMask.ts            # Date input formatting utilities
  types.ts                 # TypeScript type definitions
  page.tsx                 # Main page component
  layout.tsx               # Root layout
  globals.css              # Global styles
```

## Usage

1. Enter the correct birthday (01/02/99) on Step 1
2. Enter the correct dating date (06/30/25) on Step 2
3. View the announcement on Step 3
4. Build your bouquet by selecting flowers and colors
5. Click "Finish" to view and save your bouquet as an image

## Reset

Click the "Reset" button in the top-right corner to clear progress and return to Step 1.
