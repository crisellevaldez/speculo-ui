export function GettingStarted() {
  return (
    <div className="prose max-w-none">
      <h1>Getting Started</h1>

      <h2>Installation</h2>
      <p>Install the package using your preferred package manager:</p>
      <pre>
        <code>npm install @speculo/ui</code>
      </pre>
      <p>Or with yarn:</p>
      <pre>
        <code>yarn add @speculo/ui</code>
      </pre>

      <h2>Setup</h2>
      <p>First, import the CSS file in your app's entry point:</p>
      <pre>
        <code>import "@speculo/ui/dist/styles.css";</code>
      </pre>

      <h2>TypeScript Setup</h2>
      <p>
        The library includes TypeScript types out of the box. Make sure your
        tsconfig.json includes the following compiler options:
      </p>
      <pre>
        <code>
          {`{
  "compilerOptions": {
    "jsx": "react",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}`}
        </code>
      </pre>

      <h2>Basic Usage</h2>
      <p>Import and use components in your React application:</p>
      <pre>
        <code>
          {`import { Button } from "@speculo/ui";

function App() {
  return (
    <Button variant="primary" onClick={() => alert("Hello!")}>
      Click me
    </Button>
  );
}`}
        </code>
      </pre>

      <h2>Form Integration</h2>
      <p>
        All form components are designed to work seamlessly with
        react-hook-form:
      </p>
      <pre>
        <code>
          {`import { useForm } from "react-hook-form";
import { Input, Button } from "@speculo/ui";

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        type="email"
        placeholder="Email"
      />
      <Input
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      <Button type="submit">
        Log in
      </Button>
    </form>
  );
}`}
        </code>
      </pre>

      <h2>Validation</h2>
      <p>The library works great with zod for form validation:</p>
      <pre>
        <code>
          {`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@speculo/ui";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        type="email"
        error={errors.email?.message}
      />
      <Input
        {...register("password")}
        type="password"
        error={errors.password?.message}
      />
      <Button type="submit">
        Log in
      </Button>
    </form>
  );
}`}
        </code>
      </pre>

      <h2>Next Steps</h2>
      <ul>
        <li>
          Check out the Core Concepts guide to understand the design principles
        </li>
        <li>
          Browse the Components section for detailed documentation of each
          component
        </li>
        <li>Learn about customization options in the Customization guide</li>
        <li>See real-world usage patterns in the Examples section</li>
      </ul>
    </div>
  );
}
