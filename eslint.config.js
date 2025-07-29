import jsConfig from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";

export default [
  // Configuração para arquivos JS
  {
    files: ["**/*.js"],
    ...jsConfig.configs.recommended,
  },

  // Configuração para arquivos TS (ESM)
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.lint.json", // Usando o tsconfig.lint.json para lint
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Regras recomendadas do TypeScript
      "@typescript-eslint/no-empty-object-type": "off", // Desativa a regra
    },
  },

  // Configuração Prettier (evita conflitos)
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      ...prettierConfig.rules,
    },
  },
];