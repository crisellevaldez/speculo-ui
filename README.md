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
};
```

4. **Important**: Import the required styles in your main CSS file (e.g., app.css or globals.css):

```css
@import "@crisellevaldez/speculo-ui/styles.css";
```

This step is crucial as it provides the necessary CSS variables and base styles for components to work correctly.

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
