# Speculo UI Development Guide

Speculo UI is a custom component library built for Speculo AI, focusing on modern React components with TypeScript and Tailwind CSS. This guide outlines the development process, best practices, and workflows for maintaining and extending the library.

## Project Overview

Speculo UI provides a comprehensive set of React components designed for building modern web applications. The library emphasizes:

- Type safety with TypeScript
- Consistent styling with Tailwind CSS
- Accessibility (ARIA) compliance
- Form handling with react-hook-form integration
- Comprehensive documentation with MDX

## Directory Structure

```
speculo-ui/
├── src/
│   ├── components/        # React components
│   ├── docs/             # MDX documentation
│   ├── types/            # TypeScript definitions
│   └── utils/            # Utility functions
├── public/               # Static assets
└── dist/                 # Built files
```

## Component Development

### Creating New Components

1. **Create Component Structure**

```
src/components/ComponentName/
├── ComponentName.tsx     # Main component
└── index.ts             # Exports
```

2. **Component Implementation**

```tsx
import { cn } from '../../utils/cn';

interface ComponentNameProps {
  // Define props with TypeScript
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Implementation
}
```

3. **Documentation (MDX)**

```
src/docs/components/component-name.mdx
```

4. **Update Exports**

```ts
// src/index.ts
export * from './components/ComponentName';
```

### Component Requirements

1. **TypeScript**

- Strong type definitions
- Exported interfaces
- Generic support where applicable

2. **Accessibility**

- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

3. **Styling**

- Use Tailwind CSS classes
- Support dark mode
- Responsive design
- Custom class support

## Documentation Requirements

Each component must have comprehensive MDX documentation following this structure:

1. **Component Overview**

```mdx
# ComponentName

Brief description of the component's purpose and use cases.
```

2. **Basic Usage**

````mdx
## Basic Usage

```jsx
import { ComponentName } from "@crisellevaldez/speculo-ui";

<ComponentName>Example usage</ComponentName>;
```
````

````

3. **Variants and States**
```mdx
## Variants

```jsx
<ComponentName variant="primary">Primary</ComponentName>
<ComponentName variant="secondary">Secondary</ComponentName>
````

## States

```jsx
<ComponentName isLoading>Loading</ComponentName>
<ComponentName disabled>Disabled</ComponentName>
```

````

4. **Component API**
```mdx
## Component API

### Props

| Prop      | Type                  | Default   | Description        |
|-----------|----------------------|-----------|-------------------|
| variant   | "primary" \| "secondary" | "primary" | Visual style variant |
| size      | "sm" \| "md" \| "lg"    | "md"      | Component size      |
| disabled  | boolean              | false     | Disabled state     |
````

5. **Integration Examples**

````mdx
## Integration Examples

```jsx
// Example with react-hook-form
// Example with other common use cases
```
````

````

6. **Accessibility**
```mdx
## Accessibility

- ARIA attributes used
- Keyboard navigation support
- Screen reader considerations
- Focus management details
````

## Styling Guidelines

### Colors

```js
// Brand Colors
primary: "#C69645"    // Primary brand color
black: "#131010"      // Base black

// Semantic Colors (CSS Variables)
background: var(--background)
foreground: var(--foreground)
border: var(--border)
ring: var(--ring)
destructive: var(--destructive)
muted: var(--muted)
accent: var(--accent)
```

### Component Styling

1. **Base Styles**

```tsx
className={cn(
  "bg-background text-foreground",
  "border-border ring-ring"
)}
```

2. **Brand Colors**

```tsx
className={cn(
  "bg-primary text-primary-foreground",
  "bg-black text-black-foreground"
)}
```

3. **Dark Mode**

```tsx
className={cn(
  "bg-white dark:bg-gray-800",
  "text-gray-900 dark:text-gray-100"
)}
```

### Animations

Common transitions:

- fade-in/out
- slide-in/out
- accordion-up/down
- progress-loading/spin

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    // Assertions
  });
});
```

### Integration Tests

- Form library integration
- Component composition
- State management
- Event handling

### Accessibility Tests

- ARIA compliance
- Keyboard navigation
- Screen reader testing
- Color contrast

## Publishing Workflow

### 1. Version Update

```bash
# Update version following semver
npm version patch|minor|major
```

### 2. Build Process

```bash
# Build component library
npm run build

# Build documentation
npm run build:docs
```

### 3. Quality Checks

```bash
# Run all checks
npm run lint
npm run typecheck
npm test
```

### 4. Publishing

#### GitHub Packages

```bash
# Publish to GitHub Packages
npm publish
```

#### Firebase Deployment

1. Ensure Firebase CLI is installed:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Select project:

```bash
firebase use speculo-ui
```

4. Deploy to Firebase:

```bash
# This will deploy the docs site from the dist directory
firebase deploy --only hosting
```

The documentation site will be available at: https://speculo-ui.web.app

Note: The Firebase configuration is set to:

- Site name: speculo-ui
- Public directory: dist
- Single-page app rewrites: All routes to index.html
- Ignored files: firebase.json, dotfiles, node_modules

## Git Workflow

### Branches

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates

### Commits

Follow conventional commits:

```
feat: add new component
fix: resolve styling issue
docs: update component guide
chore: update dependencies
```

## Maintenance

### Version Control

Follow semantic versioning:

- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Deprecation Process

1. Mark as deprecated:

```tsx
/**
 * @deprecated Use NewComponent instead
 * Will be removed in version X.X.X
 */
```

2. Document migration path
3. Remove in next major version

## Support

### Issue Management

1. Bug Reports

- Reproduction steps
- Expected behavior
- Actual behavior
- Environment details

2. Feature Requests

- Use case
- Implementation proposal
- Priority level

## Resources

- [Component Library Documentation](https://speculo-ui.web.app)
- [GitHub Repository](https://github.com/crisellevaldez/speculo-ui)
- [Issue Tracker](https://github.com/crisellevaldez/speculo-ui/issues)
- [Release Notes](https://github.com/crisellevaldez/speculo-ui/releases)
