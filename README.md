# Speculo UI

A modern React component library built with TypeScript and Tailwind CSS.

## Installation

1. First, authenticate with GitHub Packages by creating a `.npmrc` file in your project root:

```
@crisellevaldez:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

2. Install the package:

```bash
npm install @crisellevaldez/speculo-ui
```

## Usage

```tsx
import { Button, Input } from "@crisellevaldez/speculo-ui";
import "@crisellevaldez/speculo-ui/styles.css";

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

## Available Components

- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Modal
- Drawer
- Toast
- And more...

## Documentation

View the full documentation and examples at [https://speculo-ui.web.app](https://speculo-ui.web.app)

## Development

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build the library:

```bash
npm run build
```

## Publishing

The package is automatically published to GitHub Packages when a new release is created on GitHub.

To create a new release:

1. Update version in package.json
2. Create and push a new tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

3. Create a new release on GitHub using the tag

## License

MIT
