# vite-env.d.ts

This file augments TypeScript's understanding of Vite's environment variables, ensuring code editors provide autocomplete and catch errors when accessing import.meta.env. It's particularly useful in TypeScript setups but beneficial even in JavaScript for better developer experience.

It's a TypeScript declaration file, providing IntelliSense and type safety specifically for `import.meta.env` (even if your app uses plain JS, it's useful with Vite). It defines types for environment variables, like API keys or base URLs, loaded from .env files.

Unlike `vite.config.js` (which defines build options like plugins) or `eslint.config.js` (which enforces code style), `vite-env.d.ts` focuses solely on env var typing. If your project uses environment variables (e.g., API URLs), include it in src/ and extend the ImportMetaEnv interface:

```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Add other VITE_ vars here
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

Access variables like

```js
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

This ensures safe access without runtime surprises.

Overall, this branch keeps your app's "skeleton" clean. Start with just global.css for styles; add config as you integrate backends.
