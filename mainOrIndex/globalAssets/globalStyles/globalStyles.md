# Global Styles

CSS (or sCSS) file that applies universal styling to the application. Styles in here can be overwritten by more specific styles for individual components

If using CSS to handle responsiveness (screen size change), should be handled here.

example:

```css
/* Resets and themes */
:root {
  --primary-color: #007bff; /* Blue for buttons/links */
  --font-family: "Arial", sans-serif;
}
body {
  margin: 0;
  font-family: var(--font-family);
  background-color: #f0f0f0;
}
/* Responsive for mobile */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  } /* Collapse to burger menu */
}
```

Can define global styling vars here that can be references by other stylesheets
