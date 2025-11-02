# Constants

Constants centralize immutable data to prevent hardcoding, improving refactoring. Place in `src/constants/` or `src/utils/constants/`, exporting objects or primitives.

Example `constants/apiEndpoints.js`:

```js
export const API_ENDPOINTS = {
  MOVIES: "/movies",
  LOGIN: "/auth/login",
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
};
```

Usage:

```js
fetch(${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.MOVIES});
```

This supports env overrides and reduces errors.
