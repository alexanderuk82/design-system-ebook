module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  settings: {
    react: { version: "18" },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",
      { patterns: ["../../packages/*"] },
    ],
  },
  ignorePatterns: ["dist", "node_modules", "*.cjs"],
};
