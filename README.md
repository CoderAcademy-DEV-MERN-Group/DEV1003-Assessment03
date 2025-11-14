<!-- DEV1003 - Assessment 3 (Front End App)

The project must contain a README.md file that includes the following information:
● An explanation of all used technologies within the project, such as:
○ dependent software and packages
○ hardware required to run the application
○ comparisons to alternative technology choices
○ purposes of chosen technologies
○ licensing of chosen technologies
● An identification and/or explanation of the style guide used in the programming throughout the
project

EXPLAINS the relevance and
impact of the utilised hardware
and software technologies
within a software project.
10%
SLO 3
Appropriate
explanation of ALL
of the hardware
and software
technologies used
within a software
project, including
information on ALL
of the following:
industry-relevance
of chosen
technologies,
comparisons to
alternative
technology choices,
purposes of chosen
technologies, and
licensing of chosen
technologies. -->

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

## Programming Style Guide

This project adheres to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), enforced through ESLint configuration [`eslint.config.js`](eslint.config.js) and Prettier formatting [`.prettierrc`](.prettierrc) to ensure quality and maintainability. This style guide allows our code to be more consistent, readable, predictable and efficient.

<!-- Changed linter rules, what we changes and why -->

## Technologies Used

- **Vite** for fast local development and build.
- **React 19** for the UI framework.
- **React Query**, **Axios**, and **React Router** for data fetching and navigation.
- **Prettier**, **ESLint**, and **Sass** for developer experience and styling.

This project uses:

<!-- react
vite
axios
tanstack query
modal
react hook form
 -->

### Core Dependencies

### **react**

- **What it does:** The main React library lets us build UI components, manage state and use hooks.
- **Why it’s important:** Everything in our app runs on React.
- **Use case:** Core logic, hooks (`useState`, `useEffect`), rendering JSX.
- **Resources:** [React Documentation](https://react.dev/reference/react)

---

### **react-dom**

- **What it does:** Connects React to the DOM (the browser view).
- **Why it’s important:** Without this, React can’t render to the page.
- **Use case:** The `createRoot()` call in `main.jsx`.
- **Resources:** [ReactDOM Documentation](https://react.dev/reference/react-dom)

---

### **react-router-dom**

- **What it does:** Enables multi-page routing and navigation.
- **Why it’s important:** Lets you use `<Route>`, `<Link>`, and `useNavigate()` to handle pages like `/leaderboard`, `/profile` etc.
- **Use case:** Page navigation in Single Page Application (SPA).
- **Resources:** [React Router Documentation](https://reactrouter.com/home)

---

### **axios**

- **What it does:** HTTP client for making API requests (`GET`, `POST`, etc.).
- **Why it’s important:** Replaces `fetch()` with easier syntax and built-in JSON parsing.
- **Use case:** Your `/apiServices.js` file uses `api.get('/leaderboard')`.
- **Relates to:** `@tanstack/react-query` for data fetching.
- **Resources:** [Axios Documentation](https://axios-http.com/docs/intro)

---

### **@tanstack/react-query**

- **What it does:** Handles API data fetching, caching, and background refetching.
- **Why it’s important:** Simplifies async calls and manages “loading / success / error” states.
- **Use case:** Fetch leaderboard data in your `useLeaderboard()` hook.
- **Relates to:** `axios` (used to perform the actual request).
- **Resources:** [React Query Documentation](https://tanstack.com/query/v4)

---

### **clsx**

- **What it does:** A tiny utility to conditionally join CSS class names.
- **Why it’s important:** Cleaner logic when using custom classes.
- **Use case:** `className={clsx( --- find examples in codebase *****)}`
- **Relates to:** Styling (custom CSS).
- **Resources** [clsx on npm](https://www.npmjs.com/package/clsx)

---

### **react-hook-form**

- **What it does:** Simplifies handling form input and validation.
- **Why it’s important:** Manages complex forms without repetitive `onChange` logic.
- **Use case:** Login forms, registration forms, or filters.
- **Relates to:** Future feature (e.g., feedback submission).
- **Resources**[React Hook Form Docs](https://react-hook-form.com/)

---

### External Packages

---

### Development Dependencies

---

### Hardware Requirements

- Modern computer with internet connection
- Disk space: (NEED TO CHECK) including dependencies

### 1.4 Software Requirements

- **Development:** VSCode or similar editing software
- **Runtime:** (Windows, macOS, Linux)
- **Environment:**
- **Testing:**
- **Version Control:** Git and GitHub
- **Package Management:** npm

---

Licensing

| Package | License |
| ------- | ------- |

---

## 2. Running the Application

### 2.1 Installation

1. Clone the repository
2. Install the dependencies:

```bash
npm install
```

3. Set up .env variables by following the .env.example file

4. Also clone the Backend API via:
   - GitHub Repo: https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment03.git
   - OR Git Clone via terminal with below code:

```
git clone https://github.com/CoderAcademy-DEV-MERN-Group/DEV1003-Assessment03.git
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run seed:movies` - Seed local database with movie data
- `npm run seed:movies:deployed` - Seed production database
- `npm run lint` - Check code for style issues
- `npm run lint-fix` - Automatically fix linting errors
- `npm run format` - Format code with Prettier

---

## Contributors

- **Joss Raine:** [Joss's GitHub Repository](https://github.com/truth-josstice)
- **Nhi Huynh:** [Nhi's Github Repository](https://github.com/lulu-codes)
- **Jordan Leal:** [Jordan's GitHub Repository](https://github.com/jordanleal12)
