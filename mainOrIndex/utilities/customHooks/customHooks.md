# Custom Hooks

Allows creation of customizable react logic as custom hooks, essentially wrapping react state and use effect logic then exporting it as its own 'Hook' to be used in components.

Custom hooks, such as the useApi example, are invoked directly in functional components to manage stateful logic like data fetching, returning values for easy destructuring and use in rendering.

Example:

```js
import { useState, useEffect } from "react";
export const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading };
};
```
