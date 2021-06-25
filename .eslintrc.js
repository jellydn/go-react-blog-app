module.exports = {
  extends: "airbnb-typescript-prettier",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
