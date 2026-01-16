// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const stylistic = require('@stylistic/eslint-plugin');

module.exports = defineConfig([
  {
    processor: angular.processInlineTemplates,
    files: ["**/*.ts"],

    plugins: {
      '@stylistic': stylistic,
    },

    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      stylistic.configs['recommended']
    ],

    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        }
      ],

      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        }
      ],

      "@/eqeqeq": ["error", "always"],

      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-inferrable-types": "off",

      "@stylistic/space-before-function-paren": ["error", "always"],
      "@stylistic/object-property-newline": "error",
      "@stylistic/comma-dangle": ['error', 'never'],
      "@stylistic/arrow-parens": "off"
    }
  },

  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {}
  }
]);
