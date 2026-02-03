# Portfolio

## ESLint config
- **ng add @angular-eslint/schematics**: creates eslint.config.js file with base configuration (doesn't lint like we want so far)
- ESLint doesn't enforce styleguide anymore, [Stylistic](https://eslint.style/) does (they're very connected). It's required then to install the Stylistic plugin: **npm install --save-dev @stylistic/eslint-plugin**
- After that, add theses lines to the code:
```js
{
  ...,

  plugins: {
    '@stylistic': stylistic,
  },

  extends: [
    ...,
    stylistic.configs['recommended'], // Equivalent to standard eslint rules. Since eslint doesn't provide styling rules anymore, this is the up to date of achieving the same result
  ],

  rules: {
    ...,
     
    "@stylistic/space-before-function-paren": ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@stylistic/object-property-newline": "error",
    "@/eqeqeq": ["error", "always"],
    '@stylistic/comma-dangle': ['error', 'never'],
  }

  ...
}
```
Notice that the styling rules must be customized from **@stylistic**. **@/<rule>: <value>** seems to behave as just **<rule>**: <value>, but I'll stick to this pattern. 

Even that VSCode complains about errors on the config file, it's fine. Test it in some .ts file and if things are working as expected, just ignre the errors.

## About ESLint
Since ESLint v9 (used by Angular 21):
- ESLint core only provides correctness rules
- All stylistic rules were removed from core
- eslint:recommended is the maximum ESLint-core config

Seems like ESLint is still the go-to tool for linting, and it's the primary choice of the market apps.

## Localization (i18n)
- ng add @angular/localize
  - Seems like this solution isn't what we want. This solution is build-based, which means it's not prepared for real time language update.
  - Updates main.ts, tsconfig.app.json and angular.json
  - We're not using that
- npm i @ngx-translate/core @ngx-translate/http-loader
  - @ngx-translate/http-loader: optional and used to download translations on demand from server
  - https://ngx-translate.org/
  - https://ngx-translate.org/getting-started/installation/ fow instructions
- On the .ts file:
  - this.translateService.instant('<path>'): use only when translation is already loaded
  - this.translateService.get('<path>').subscribe(translation => ....): use to asynchronously load the translations
    - You can pass an array to .get: this.translateService.get(['home.resume.title', 'home.resume.paragraph']).subscribe(b => console.log({ b }))

## Icons
- ng-icons: https://github.com/ng-icons/ng-icons
- npm install @ng-icons/core @ng-icons/phosphor-icons
  - phosphor-icons is the name of the lib of icons, but ng-icons make available a lot of other icon libs

## Safe hover
- To safely hover on desktop and avoid the mobile hover effect, use this combination of @media: @media (hover: hover) and (pointer: fine) {}. Together they check if the device can hover, and also if the device has cursor (not touchscreen only like some touchscreen laptops).

# Vitest Browser Mode
By default, Vitest runs outside a browser, but we can use its UI if we want.
- npm i -D @vitest/browser-playwright
- npx playwright install 
- in angular.json: test > options > "browsers": ["chromium"] 
