# Helpers

Helpers are pure functions for common tasks, in `src/helpers/` or `src/utils/`. They avoid state/side effects, focusing on transformations.

Example `helpers/dataUtils.js`:

```js
export const calculateProgress = (watched, total) => (watched / total) * 100;

export const formatCurrency = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount
  );

export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
```

In a component:

```js
const progress = calculateProgress(watchedCount, 100);
```
