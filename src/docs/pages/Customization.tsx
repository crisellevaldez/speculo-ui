export default function Customization() {
  return (
    <div className="prose max-w-none">
      <h1>Customization</h1>

      <h2>Theming Guide</h2>
      <p>
        The library uses Tailwind CSS for styling, making it highly customizable
        through Tailwind's configuration system.
      </p>

      <h3>Colors</h3>
      <p>Customize the color palette by extending Tailwind's theme:</p>
      <pre>
        <code>
          {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Add more custom colors
      },
    },
  },
}`}
        </code>
      </pre>

      <h3>Typography</h3>
      <p>Customize font families, sizes, and other typography settings:</p>
      <pre>
        <code>
          {`module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      },
    },
  },
}`}
        </code>
      </pre>

      <h3>Spacing</h3>
      <p>Customize spacing scales for padding, margin, width, etc.:</p>
      <pre>
        <code>
          {`module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
}`}
        </code>
      </pre>

      <h2>CSS Utilities</h2>
      <p>Create custom utilities for common patterns in your application:</p>

      <h3>Custom Utilities</h3>
      <pre>
        <code>
          {`@layer utilities {
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .scrollbar-hide {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}`}
        </code>
      </pre>

      <h3>Component Classes</h3>
      <p>Create reusable component classes:</p>
      <pre>
        <code>
          {`@layer components {
  .card {
    @apply rounded-lg border border-gray-200 bg-white p-6 shadow-sm;
  }

  .input-base {
    @apply rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500;
  }
}`}
        </code>
      </pre>

      <h2>Component Styling</h2>
      <p>Each component accepts a className prop for custom styling:</p>

      <h3>Basic Customization</h3>
      <pre>
        <code>
          {`// Custom button styles
<Button
  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
>
  Gradient Button
</Button>

// Custom input styles
<Input
  className="border-2 border-purple-500 focus:border-purple-600 focus:ring-purple-600"
/>

// Custom card styles
<div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg">
  Content
</div>`}
        </code>
      </pre>

      <h3>Complex Customization</h3>
      <pre>
        <code>
          {`// Custom modal styling
<Modal
  className="bg-gradient-to-br from-white to-gray-50"
>
  <Modal.Header className="border-b-2 border-gray-100">
    Custom Header
  </Modal.Header>
  <Modal.Body className="space-y-4">
    Content
  </Modal.Body>
  <Modal.Footer className="border-t-2 border-gray-100">
    Actions
  </Modal.Footer>
</Modal>

// Custom table styling
<Table
  className="border-separate border-spacing-0"
  headerClassName="bg-gray-50"
  rowClassName="hover:bg-blue-50"
/>`}
        </code>
      </pre>

      <h2>Dark Mode</h2>
      <p>The library supports Tailwind's dark mode out of the box:</p>

      <h3>Basic Dark Mode</h3>
      <pre>
        <code>
          {`// Add dark mode classes to your root layout
<div className="dark:bg-gray-900 dark:text-white">
  <App />
</div>

// Components automatically support dark mode
<Button className="dark:bg-gray-800 dark:hover:bg-gray-700">
  Dark Mode Button
</Button>

<Input className="dark:bg-gray-800 dark:border-gray-700" />

<Card className="dark:bg-gray-800 dark:border-gray-700">
  Content
</Card>`}
        </code>
      </pre>

      <h3>Custom Dark Mode Colors</h3>
      <pre>
        <code>
          {`// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          text: '#f8fafc',
        },
      },
    },
  },
}`}
        </code>
      </pre>

      <h3>Dark Mode Toggle</h3>
      <pre>
        <code>
          {`function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Button
      onClick={() => setIsDark(!isDark)}
      className="dark:bg-gray-800"
    >
      {isDark ? '🌞' : '🌙'}
    </Button>
  );
}`}
        </code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Use Tailwind's configuration system for global changes</li>
        <li>Create reusable component classes for common patterns</li>
        <li>Maintain consistent spacing and color scales</li>
        <li>Consider dark mode when styling components</li>
        <li>Use CSS custom properties for dynamic values</li>
        <li>Follow responsive design principles</li>
        <li>Keep accessibility in mind when customizing</li>
      </ul>
    </div>
  );
}
