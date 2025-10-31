# Burger Menu

Component that conditionally renders below certain screen size, all elements contained in header and footer rendered here instead

## States

- Use state to manage open and unopened menu (optional)
- Use global state to see if logged in, if so display 'logout' instead of 'login' and 'register'

## Use Effects

- Render login and register links if login state is not set to logged, otherwise will render logout link. Will update any time login state updates
- Render burger menu open when burgerOpened state set to true else just render burger icon (optional)

## Components

- NavLinks
