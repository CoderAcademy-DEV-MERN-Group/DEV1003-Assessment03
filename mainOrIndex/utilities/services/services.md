# Services Branch

Contains services that handle tasks like API calls, eg inside `apiServes.js` that allows abstraction and re-use of API fetching logic.

API services like the example can be imported and called asynchronously in hooks or components to fetch data, promoting reusable backend interactions without cluttering UI code

Example:

```jsx
// src/utilities/apiService.js
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchMovies = async () => {
  const response = await fetch(`${API_BASE}/movies`);
  if (!response.ok) throw new Error("Fetch failed");
  return response.json();
};
```
