import reactRefresh from 'eslint-plugin-react-refresh'
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
  pluginJs.configs.recommended,
  reactRefresh.configs.vite,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "off"
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": [
        "warn"
      ],
      "prettier/prettier": [
        "error",
        {
          "singleQuote": true,
          "useTabs": true,
          "semi": true,
          "trailingComma": "all",
          "bracketSpacing": true,
          "printWidth": 100,
          "endOfLine": "auto"
        }
      ]
    },
  },
);
