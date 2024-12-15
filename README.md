# Speculo UI

A modern React component library built with TypeScript and Tailwind CSS.

## Installation

1. Create `.npmrc` in your project root:

```
@crisellevaldez:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

2. Install the package:

```bash
npm install @crisellevaldez/speculo-ui
```

3. Add to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ... your other content paths
    "./node_modules/@crisellevaldez/speculo-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
```

4. **Important**: Import the required styles in your main CSS file (e.g., app.css or globals.css):

```css
@import "@crisellevaldez/speculo-ui/styles.css";
```

This import provides:

- CSS variables for theming (colors, border radius)
- Dark mode support through CSS variables
- Base component styles

5. For Next.js projects, add to `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@crisellevaldez/speculo-ui"],
};

module.exports = nextConfig;
```

## Usage

```tsx
import { Button } from "@crisellevaldez/speculo-ui";

function App() {
  return <Button>Click me</Button>;
}
```

## Theming

The library uses CSS variables for theming, providing:

- Consistent color palette across components
- Built-in dark mode support
- Easy customization through CSS variables
- HSL color format for flexible color manipulation

## Components

- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Modal
- Drawer
- Toast
- Typography
- And more...

## Documentation

View the full documentation and examples at [https://speculo-ui.web.app](https://speculo-ui.web.app)
