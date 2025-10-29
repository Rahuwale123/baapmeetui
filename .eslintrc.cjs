module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  plugins: ["react", "@typescript-eslint", "jsx-a11y"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  ignorePatterns: ["dist", "node_modules", "*.config.*"]
};
