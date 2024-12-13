export function Installation() {
  return (
    <div className="prose max-w-none">
      <h1>Installation</h1>

      <h2>Package Installation</h2>
      <p>Install the package and its peer dependencies:</p>
      <pre>
        <code>
          {`# npm
npm install @speculo/ui react react-dom

# yarn
yarn add @speculo/ui react react-dom

# pnpm
pnpm add @speculo/ui react react-dom`}
        </code>
      </pre>

      <h2>Peer Dependencies</h2>
      <p>The library requires the following peer dependencies:</p>
      <ul>
        <li>React 18 or later</li>
        <li>React DOM 18 or later</li>
        <li>Tailwind CSS 3 or later</li>
      </ul>

      <h2>Tailwind CSS Setup</h2>
      <p>Add the library's Tailwind preset to your tailwind.config.js:</p>
      <pre>
        <code>
          {`// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@speculo/ui/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [
    require('@speculo/ui/tailwind')
  ],
}`}
        </code>
      </pre>

      <h2>Import Styles</h2>
      <p>Import the base styles in your app's entry point:</p>
      <pre>
        <code>
          {`// src/index.tsx or src/main.tsx
import '@speculo/ui/styles.css';`}
        </code>
      </pre>

      <h2>TypeScript Configuration</h2>
      <p>
        If you're using TypeScript, ensure your tsconfig.json has the following
        settings:
      </p>
      <pre>
        <code>
          {`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}`}
        </code>
      </pre>

      <h2>Environment Setup</h2>
      <p>The library works with various build tools and frameworks:</p>

      <h3>Vite</h3>
      <pre>
        <code>
          {`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`}
        </code>
      </pre>

      <h3>Next.js</h3>
      <pre>
        <code>
          {`// next.config.js
module.exports = {
  transpilePackages: ['@speculo/ui'],
};`}
        </code>
      </pre>

      <h3>Create React App</h3>
      <p>
        No additional configuration needed. Just install and start using the
        components.
      </p>

      <h2>Verify Installation</h2>
      <p>Create a new component to verify the installation:</p>
      <pre>
        <code>
          {`import { Button } from '@speculo/ui';

function TestComponent() {
  return (
    <Button variant="primary" onClick={() => alert('It works!')}>
      Click me
    </Button>
  );
}`}
        </code>
      </pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Read the Getting Started guide for basic usage</li>
        <li>Explore the Components section for detailed documentation</li>
        <li>Check out the Examples section for real-world usage patterns</li>
      </ul>

      <h2>Troubleshooting</h2>
      <h3>Common Issues</h3>
      <ul>
        <li>
          <strong>Styles not loading:</strong> Make sure you've imported the CSS
          file and configured Tailwind correctly
        </li>
        <li>
          <strong>TypeScript errors:</strong> Verify your tsconfig.json settings
          and that you're using the correct React types
        </li>
        <li>
          <strong>Build errors:</strong> Ensure all peer dependencies are
          installed and at the correct versions
        </li>
      </ul>

      <h3>Getting Help</h3>
      <p>If you run into issues:</p>
      <ul>
        <li>Check the GitHub issues for known problems</li>
        <li>Join our Discord community for help</li>
        <li>Open a new issue if you find a bug</li>
      </ul>
    </div>
  );
}
