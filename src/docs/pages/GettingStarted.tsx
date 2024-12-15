export function GettingStarted() {
  return (
    <div className="prose max-w-none">
      <h1>Getting Started</h1>

      <h2>Basic Usage</h2>
      <p>
        After installation, you can import and use components in your React
        application:
      </p>
      <pre>
        <code>
          {`import { Button } from "@crisellevaldez/speculo-ui";

function App() {
  return (
    <Button onClick={() => alert("Hello!")}>
      Click me
    </Button>
  );
}`}
        </code>
      </pre>

      <h2>Available Components</h2>
      <p>Speculo UI includes a wide range of components:</p>
      <ul>
        <li>Button</li>
        <li>Input</li>
        <li>Select</li>
        <li>Checkbox</li>
        <li>Radio</li>
        <li>Switch</li>
        <li>Modal</li>
        <li>Drawer</li>
        <li>Toast</li>
        <li>Typography</li>
        <li>And more...</li>
      </ul>

      <h2>Form Integration</h2>
      <p>
        All form components are designed to work seamlessly with
        react-hook-form:
      </p>
      <pre>
        <code>
          {`import { useForm } from "react-hook-form";
import { Input, Button } from "@crisellevaldez/speculo-ui";

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

      <h2>Form Validation</h2>
      <p>The library works great with zod for form validation:</p>
      <pre>
        <code>
          {`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@crisellevaldez/speculo-ui";

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

      <h2>Documentation</h2>
      <p>
        View the full documentation and examples at{" "}
        <a
          href="https://speculo-ui.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://speculo-ui.web.app
        </a>
      </p>
    </div>
  );
}
