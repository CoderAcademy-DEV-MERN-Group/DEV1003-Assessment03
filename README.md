# The Century Screening Room - Front-End App (React)

![The Century Screening Room Logo](src/assets/images/logoreadme.png)

## Table of Contents

--

## Project Overview

This repository contains the Front-End React application for **The Century Screening Room**. This application was initialised and developed using Vite as the build tool alongside React (Version 19). It serves the client side user interface web application and is designed to work in conjunction with the Back-End API App, and when implemented together they form a fully functional **Full-Stack MERN Application**.

The development of our group's project is documented across the below GitHub repositories for full context:

- [Project Planning, Design and Documentation](https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment01)
- [Back-End API Application](https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment02)
- [Front-End Application (this repository)](https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment03)

### Purpose of the App

**The Century Screening Room** is a social platform web application that showcases the "Reel Canon," a curated list of 100 films for movie enthusiasts to explore, mark and rate movies they have watched.as they complete watching them.

## Programming Style Guide

<!-- An identification and/or explanation of the style guide used in the programming throughout the project -->

This project adheres to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), enforced through ESLint configuration [`eslint.config.js`](eslint.config.js) and Prettier formatting [`.prettierrc`](.prettierrc) to ensure quality and maintainability. This style guide allows our code to be more consistent, readable, predictable and efficient.

<!-- Changed linter rules, what we changes and why "We made this change due to blah blah" -->

## Technologies Used

### Core Dependencies

- **React (Version 19)** for the UI framework.
- Why we use it
-
- Pros vs Cons (Why) - 2 other comparisons to alternative technology choices

- **Vite** for fast local development and build.
- **Tanstack React Query**
- **Axios**
- **React-Modal**

<!-- DEV1003 - Assessment 3 (Front End App)

The project must contain a README.md file that includes the following information:
● An explanation of all used technologies within the project, such as:
○ dependent software and packages
○ hardware required to run the application
○ comparisons to alternative technology choices
○ purposes of chosen technologies
○ licensing of chosen technologies

EXPLAINS the relevance and impact of the utilised hardware and software technologies within a software project.

Appropriate explanation of ALL of the hardware and software technologies used within a software project, including information on ALL of the following:
industry-relevance of chosen technologies,
comparisons to alternative technology choices,
purposes of chosen technologies,
and licensing of chosen technologies. -->

### `react`

- **What it does:** The main React library lets us build UI components, manage state and use hooks.
- **Why it’s important:** Everything in our app runs on React.
- **Use case:** Core logic, hooks (`useState`, `useEffect`), rendering JSX.
- **Resources:** [React Documentation](https://react.dev/reference/react)
<!-- - **Comparison** Compared to alternatives like Vue or Angular, React offers a component-based architecture with a large ecosystem and flexibility in choosing libraries for routing and state management. Its virtual DOM enhances performance for dynamic applications. -->

---

### `vite`

---

### `axios`

- **What it does:** HTTP client for making API requests (`GET`, `POST`, etc.).
- **Why it’s important:** Replaces `fetch()` with easier syntax and built-in JSON parsing.
- **Use case:** Your `/apiServices.js` file uses `api.get('/leaderboard')`.
- **Relates to:** `@tanstack/react-query` for data fetching.
- **Resources:** [Axios Documentation](https://axios-http.com/docs/intro)
<!-- - **Comparison:** Compared to the native `fetch()` API, Axios provides a simpler and more intuitive syntax for making HTTP requests. It automatically transforms JSON data, supports request and response interceptors, and has better error handling capabilities. Axios also supports older browsers that may not fully support the Fetch API. -->

---

### `@tanstack/react-query`

- **What it does:** Handles API data fetching, caching, and background refetching.
- **Why it’s important:** Simplifies async calls and manages “loading / success / error” states.
- **Use case:** Fetch leaderboard data in your `useLeaderboard()` hook.
- **Relates to:** `axios` (used to perform the actual request).
- **Resources:** [React Query Documentation](https://tanstack.com/query/v4)
<!-- - **Comparison:** Compared to manual data fetching with `useEffect`, React Query abstracts away much of the boilerplate code needed for handling loading states, caching, and refetching. It provides a declarative API that simplifies data management in React applications, leading to cleaner and more maintainable code. -->

---

### `react-modal`

- **What it does:**
- **Why it’s important:**
- **Use case:**
- **Relates to:**
- **Resources:**
- **Comparison:**

---

(optional)

### `react-hook-form`

- **What it does:** Simplifies handling form input and validation.
- **Why it’s important:** Manages complex forms without repetitive `onChange` logic.
- **Use case:** Login forms, registration forms, or filters.
- **Relates to:** Future feature (e.g., feedback submission).
- **Resources**[React Hook Form Docs](https://react-hook-form.com/)

---

### `react-dom`

- **What it does:** Connects React to the DOM (the browser view).
- **Why it’s important:** Without this, React can’t render to the page.
- **Use case:** The `createRoot()` call in `main.jsx`.
- **Resources:** [ReactDOM Documentation](https://react.dev/reference/react-dom)

---

### `react-router-dom`

- **What it does:** Enables multi-page routing and navigation.
- **Why it’s important:** Lets you use `<Route>`, `<Link>`, and `useNavigate()` to handle pages like `/leaderboard`, `/profile` etc.
- **Use case:** Page navigation in Single Page Application (SPA).
- **Resources:** [React Router Documentation](https://reactrouter.com/home)

---

<!-- ### `clsx`

- **What it does:** A tiny utility to conditionally join CSS class names.
- **Why it’s important:** Cleaner logic when using custom classes.
- **Use case:** `className={clsx( --- find examples in codebase *****)}`
- **Relates to:** Styling (custom CSS).
- **Resources** [clsx on npm](https://www.npmjs.com/package/clsx) -->

### `clxs`

- **What it does:** A tiny utility to conditionally join CSS class names.
- **How we used it:** Helped keep code clear when conditionally styling elements.

  <!-- "dependencies": {
    "@formspree/react": "^3.0.0",
    "@fortawesome/free-regular-svg-icons": "^7.1.0",
    "@fortawesome/free-solid-svg-icons": "^7.1.0",
    "@fortawesome/react-fontawesome": "^3.1.0",
          "@tanstack/react-query": "^5.90.6",
          "axios": "^1.13.1",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.24",
    "lodash-es": "^4.17.21",
          "react": "^19.1.1",
    "react-burger-menu": "^3.1.0",
    "react-dom": "^19.1.1",
    "react-error-boundary": "^6.0.0",
    "react-hook-form": "^7.66.0",
    "react-hot-toast": "^2.6.0",
    "react-intersection-observer": "^10.0.0",
          "react-modal": "^3.16.3",
    "react-router-dom": "^7.9.5",
    "sass": "^1.93.3" -->---

---

### Development Dependencies

  <!-- "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@tanstack/eslint-plugin-query": "^5.91.2",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.1.0",
    "@vitest/ui": "^4.0.8",
    "eslint": "^9.36.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-import-resolver-node": "^0.3.9",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-prettier": "^5.5.4",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "jsdom": "^27.1.0",
    "prettier": "^3.6.2",
    "vite": "^7.1.7",
    "vitest": "^4.0.8"
  }
   -->

---

### Hardware Requirements

- Modern computer with internet connection
- Disk space: 500MB including dependencies

---

### Software Requirements

- **Development:** VSCode or similar editing software
- **Runtime:** Node.js compatible OS (Windows, macOS, Linux)
- **Environment:** Node.js runtime environment
- **Testing:** Vitest testing framework
- **Version Control:** Git and GitHub
- **Package Management:** npm
- **Languages Used:** JavaScript (ES6+), JSX, HTML, CSS/SASS

---

### Third-party Licenses

The project uses the following open-source packages with their versions and licenses:

| Package Version                           | License           |
| ----------------------------------------- | ----------------- |
| @eslint/js 9.36.0                         | MIT               |
| @formspree/react 3.0.0                    | MIT               |
| @fortawesome/free-regular-svg-icons 7.1.0 | CC-BY-4.0 AND MIT |
| @fortawesome/free-solid-svg-icons 7.1.0   | CC-BY-4.0 AND MIT |
| @fortawesome/react-fontawesome 3.1.0      | MIT               |
| @tanstack/eslint-plugin-query 5.91.2      | MIT               |
| @tanstack/react-query 5.90.6              | MIT               |
| @testing-library/jest-dom 6.9.1           | MIT               |
| @testing-library/react 16.3.0             | MIT               |
| @testing-library/user-event 14.6.1        | MIT               |
| @types/react 19.1.16                      | MIT               |
| @types/react-dom 19.1.9                   | MIT               |
| @vitejs/plugin-react 5.1.0                | MIT               |
| @vitest/ui 4.0.8                          | MIT               |
| axios 1.13.1                              | MIT               |
| clsx 2.1.1                                | MIT               |
| eslint 9.36.0                             | MIT               |
| eslint-config-prettier 10.1.8             | MIT               |
| eslint-import-resolver-node 0.3.9         | MIT               |
| eslint-plugin-import 2.32.0               | MIT               |
| eslint-plugin-jsx-a11y 6.10.2             | MIT               |
| eslint-plugin-prettier 5.5.4              | MIT               |
| eslint-plugin-react 7.37.5                | MIT               |
| eslint-plugin-react-hooks 5.2.0           | MIT               |
| eslint-plugin-react-refresh 0.4.22        | MIT               |
| framer-motion 12.23.24                    | MIT               |
| globals 16.4.0                            | MIT               |
| jsdom 27.1.0                              | MIT               |
| prettier 3.6.2                            | MIT               |
| react 19.1.1                              | MIT               |
| react-burger-menu 3.1.0                   | MIT               |
| react-dom 19.1.1                          | MIT               |
| react-error-boundary 6.0.0                | MIT               |
| react-hook-form 7.66.0                    | MIT               |
| react-hot-toast 2.6.0                     | MIT               |
| react-intersection-observer 10.0.0        | MIT               |
| react-modal 3.16.3                        | MIT               |
| react-router-dom 7.9.5                    | MIT               |
| sass 1.93.3                               | MIT               |
| vite 7.1.7                                | MIT               |
| vitest 4.0.8                              | MIT               |

---

## Running the Application

### Installation

1. Clone this repository via your terminal

```bash
git clone https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment03.git
```

2. Install the dependencies:

```bash
npm install
```

3. Set up `.env` variables by following the `.env.production` file

4. Also clone the Backend API for full functionality:

- [GitHub Repository for Back-End](https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment02.git)
- OR Git Clone via terminal with below code:

```bash
git clone https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment02.git
```

> See Back-End Installation Guide [here](https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment02/blob/main/docs/INSTALLATION_AND_DEPLOYMENT.md)

---

## Available Scripts

These are the available scripts that you can run in this project directory:

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production assets
- `npm start` - Start production server
- `npm test` - Run test suite (Vitest)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open Vitest interactive UI
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run lint` - Check code for style issues (ESLint)
- `npm run lint:fix` - Automatically fix linting errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting with Prettier
- `npm run preview` - Preview the production build locally (`vite preview`)

---

### Future Development Plans

### Version Pipeline

Below is a list of current and future plans for improving functionality and features of this project:

**Current Version:**

**V.0.1.0** - Core functionality created and tested

- User Authentication and Authorisation:
  - Register and login to manage user accounts and profiles including changing password.
- Movie Browsing with the "Reel Canon" with 100 loaded movies:
  - Explore the curated list of 100 films with brief summary about the movie with hover effect.
- Rating System:
  - Rate movies from 1 to 5 stars after watching.
- Progress tracking:
  - Visual "Popcorn Meter" that shows how many percent of the Reel Canon the user has completed.
  - Tracker to list how many movies user has watched and rated and categorised by Genres and view average ratings.
  -
- Basic friend system
- Leaderboard
  The app's first release version features the following functionalities:

**Planned Releases:**

**V.0.2.0** - Custom lists

- User-created custom lists
- List sharing between friends
- List subscriptions without friendship
- List comparison features

**V.0.3.0** - Recommendation Engine

- Smart movie suggestions
- Friend-based recommendations
- "Next to watch" features

**V.0.4.0** - Achievements & Advanced Leaderboards

- Genre-specific leaderboards
- Enhanced leaderboards accounting for social features
- Challenge system
  - Trophies based on Genre
  - Base trophy implementation for Reel Canon completion

**V.0.5.0** - Enhanced Social & Notification System

- Movie discussions and user reviews
- Social interactions
- Notifications for friend requests

**V.1.0.0** - Production release

- Real-time notifications
- Production optimization

---

### Contributing

- **Branching and Forking**: Fork the repository and create feature branches from `main` using descriptive names (`feature/user-auth`, `fix/rating-bug`)
- **Conventional Commits**: Follow conventional commit format (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`) for clear commit history
- **Pull Requests**: Pull requests with no explanation will not be merged, please leave detailed comments in your code!
- **Issues**: Issues must be clear and concise, vague issues are non-issues!

---

## Contributors

- **Joss Raine:** [Joss's GitHub Repository](https://github.com/truth-josstice)
- **Nhi Huynh:** [Nhi's Github Repository](https://github.com/lulu-codes)
- **Jordan Leal:** [Jordan's GitHub Repository](https://github.com/jordanleal12)
