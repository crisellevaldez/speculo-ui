import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SpeculoUI",
      formats: ["es", "umd"],
      fileName: (format) => `speculo-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // Make it work for both Firebase hosting and npm package
        intro: `
          if (typeof window !== "undefined") {
            window.SpeculoUI = {};
          }
        `,
        outro: `
          if (typeof window !== "undefined") {
            Object.assign(window.SpeculoUI, exports);
          }
        `,
      },
    },
  },
});
