export function Installation() {
  return (
    <div className="prose max-w-none">
      <h1>Installation</h1>

      <h2>1. Configure .npmrc</h2>
      <p>Create `.npmrc` in your project root:</p>
      <pre>
        <code>
          {`@crisellevaldez:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN`}
        </code>
      </pre>

      <h2>2. Install Package</h2>
      <p>Install the package:</p>
      <pre>
        <code>{`npm install @crisellevaldez/speculo-ui`}</code>
      </pre>

      <h2>3. Configure Tailwind</h2>
      <p>Add to your tailwind.config.js:</p>
      <pre>
        <code>
          {`/** @type {import('tailwindcss').Config} */
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
  // Optional: Add typography plugin if you're using prose classes
  plugins: [require("@tailwindcss/typography")],
}`}
        </code>
      </pre>

      <h2>4. Import Styles</h2>
      <p>
        Import the required styles in your main CSS file (e.g., app.css or
        globals.css):
      </p>
      <pre>
        <code>
          {`@import "@crisellevaldez/speculo-ui/styles.css";

/* This import provides:
 * - CSS variables for theming (--primary, --secondary, etc.)
 * - Dark mode support through CSS variables
 * - Base component styles
 */`}
        </code>
      </pre>
      <p>
        The CSS variables defined in the imported styles will automatically work
        with the Tailwind configuration, enabling consistent theming and dark
        mode support across your application.
      </p>

      <h2>5. Next.js Configuration</h2>
      <p>For Next.js projects, add to next.config.js:</p>
      <pre>
        <code>
          {`/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@crisellevaldez/speculo-ui"],
};

module.exports = nextConfig;`}
        </code>
      </pre>

      <h2>Usage</h2>
      <p>Import and use components in your React application:</p>
      <pre>
        <code>
          {`import { Button } from "@crisellevaldez/speculo-ui";

function App() {
  return <Button>Click me</Button>;
}`}
        </code>
      </pre>
    </div>
  );
}
