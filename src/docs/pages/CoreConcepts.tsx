export default function CoreConcepts() {
  return (
    <div className="prose max-w-none">
      <h1>Core Concepts</h1>

      <h2>Component Patterns</h2>
      <p>
        Our components follow consistent patterns to ensure predictability and
        ease of use:
      </p>
      <ul>
        <li>
          <strong>Composition Over Configuration</strong>
          <p>
            Components are designed to be composable, allowing you to build
            complex UIs from simple building blocks. For example, form controls
            use composition:
          </p>
          <pre>
            <code>
              {`<Form.Control>
  <Form.Label>Email</Form.Label>
  <Input />
  <Form.HelperText>We'll never share your email.</Form.HelperText>
</Form.Control>`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Controlled & Uncontrolled Modes</strong>
          <p>
            Components support both controlled and uncontrolled modes, giving
            you flexibility in how you manage state:
          </p>
          <pre>
            <code>
              {`// Controlled
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Uncontrolled
<Input defaultValue="Default value" />`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Consistent Props</strong>
          <p>Components use consistent prop patterns across the library:</p>
          <ul>
            <li>
              <code>className</code> for additional styles
            </li>
            <li>
              <code>disabled</code> for disabled state
            </li>
            <li>
              <code>error</code> for error messages
            </li>
            <li>
              <code>ref</code> for forwarded refs
            </li>
          </ul>
        </li>
        <li>
          <strong>Accessibility First</strong>
          <p>
            Components are built with accessibility in mind, including proper
            ARIA attributes, keyboard navigation, and focus management.
          </p>
        </li>
      </ul>

      <h2>Styling System</h2>
      <p>
        The library uses Tailwind CSS for styling, providing several benefits:
      </p>
      <ul>
        <li>
          <strong>Utility-First</strong>
          <p>
            Components use Tailwind's utility classes for styling, making it
            easy to understand and customize:
          </p>
          <pre>
            <code>
              {`<Button
  className="bg-purple-600 hover:bg-purple-700"
>
  Custom Button
</Button>`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Theme Customization</strong>
          <p>Customize the theme by extending Tailwind's configuration:</p>
          <pre>
            <code>
              {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
    },
  },
}`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Dark Mode</strong>
          <p>
            Components support dark mode through Tailwind's dark mode classes:
          </p>
          <pre>
            <code>
              {`<div className="dark:bg-gray-800 dark:text-white">
  <Button className="dark:bg-gray-700">
    Dark Mode Button
  </Button>
</div>`}
            </code>
          </pre>
        </li>
      </ul>

      <h2>Form Integration</h2>
      <p>
        All form components are designed to work seamlessly with
        react-hook-form:
      </p>
      <ul>
        <li>
          <strong>Register Integration</strong>
          <p>Components work directly with react-hook-form's register:</p>
          <pre>
            <code>
              {`const { register } = useForm();

<Input {...register("email")} />
<Select {...register("country")} />
<Checkbox {...register("terms")} />`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Controller Pattern</strong>
          <p>For complex components, use the Controller component:</p>
          <pre>
            <code>
              {`const { control } = useForm();

<Controller
  name="select"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      options={options}
    />
  )}
/>`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Form Context</strong>
          <p>Components can access form context for advanced use cases:</p>
          <pre>
            <code>
              {`const {
  formState: { errors, isSubmitting },
  watch,
} = useForm();

<Form.Control error={errors.email?.message}>
  <Input
    disabled={isSubmitting}
    {...register("email")}
  />
</Form.Control>`}
            </code>
          </pre>
        </li>
      </ul>

      <h2>Validation</h2>
      <p>
        The library is designed to work with zod for type-safe form validation:
      </p>
      <ul>
        <li>
          <strong>Schema Definition</strong>
          <p>Define your validation schema with zod:</p>
          <pre>
            <code>
              {`const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Too short"),
  confirm: z.string()
}).refine(
  (data) => data.password === data.confirm,
  {
    message: "Passwords don't match",
    path: ["confirm"],
  }
);`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Form Integration</strong>
          <p>Use the schema with react-hook-form:</p>
          <pre>
            <code>
              {`const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema)
});`}
            </code>
          </pre>
        </li>
        <li>
          <strong>Type Safety</strong>
          <p>Get full TypeScript support:</p>
          <pre>
            <code>
              {`type FormData = z.infer<typeof schema>;

const onSubmit = (data: FormData) => {
  // data is fully typed
};`}
            </code>
          </pre>
        </li>
      </ul>

      <h2>Best Practices</h2>
      <ul>
        <li>Use composition to build complex components</li>
        <li>Leverage TypeScript for type safety</li>
        <li>Follow accessibility guidelines</li>
        <li>Maintain consistent error handling</li>
        <li>Use proper form validation</li>
        <li>Consider responsive design</li>
        <li>Optimize for performance</li>
      </ul>
    </div>
  );
}
