import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // Ignore dist and node_modules
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  // Base JS config
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // TypeScript support
  ...tseslint.configs.recommended,
];
