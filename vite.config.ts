import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
      include: ["src/components/**/*", "src/index.ts"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VegaReact",
      formats: ["es", "cjs"],
      fileName: (format) => `vegareact.${format === "es" ? "es" : "cjs"}.js`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "lucide-react",
        "react-phone-number-input",
      ],
      output: {
        assetFileNames: "style.css",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
