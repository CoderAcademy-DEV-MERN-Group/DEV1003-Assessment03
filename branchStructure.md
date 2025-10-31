- Entry Level (main.jsx): Renders App to DOM; imports React, ReactDOM, global styles.

  - Global Assets Branch

    - Styles: global.css (App-wide resets, themes, responsive queries for navbar/footer collapse to burger on mobile/tablet)

    - Config: vite-env.d.ts (Env vars, e.g., API_BASE_URL for backend)

  - Providers Branch (Wrap App for global state)

    - AuthProvider.jsx (Context: global user state, token; `useState` for user data; `useEffect` for initial login check via localStorage; updates on login/register/logout)

  - Root Component Branch: App.jsx (Wraps shared layout around router; global error boundary if needed)

    - Shared Layout Branch (Rendered in App outside routes for persistence)

      - Header/Navbar Group
        - Navbar.jsx (Component: `useState` for burger toggle on mobile; renders links (Home, ReelCanon, Profile, Leaderboard, About) based on auth from Context; sign-in/register links top-right if unauth; no direct API)
        - Navbar.css (Styles: fixed top, responsive collapse)
        - BurgerMenu.jsx (Sub-component: Mobile menu; `useState` for open/close; renders nav links)
      - Footer Group
        - Footer.jsx (Component: Static; social links left (e.g., icons), nav links right; no state/API)
        - Footer.css (Styles: fixed bottom, responsive)

    - Routing Branch (In App; uses react-router-dom for SPA navigation)

      - BrowserRouter

        - Routes Group (Defines paths; protect profile/leaderboard with auth check)

          - PrivateRoute.jsx (Wrapper: Checks AuthContext, redirects to sign-in if unauth)

          - Route: Home.jsx (Path: '/'; Component: `useState` for carousel index; `useEffect` for fetches; renders intro para, carousel center, top 3 leaderboard right)

            - Home.css (Styles: Layout with flex/grid for para, carousel, leaderboard)

            - Carousel.jsx (Sub-component: Scrolling featured movies; `useState` for slide; props movies from parent; simple CSS transitions)

            - LeaderboardTop3.jsx (Sub-component: Top 3 users; props from parent; simple list or cards)

            - useFeaturedMovies.js (Hook: `useEffect` API to /movies/reel-canon for subset; returns data/loading/error)

            - useTopLeaderboard.js (Hook: `useEffect` API to /leaderboard/ for top 3; returns data)

          - Route: SignIn.jsx (Path: '/signin'; Component: `useState` for form inputs/errors; handles submit; API post to /auth/login, updates AuthContext)

            - SignIn.css (Styles: Centered form)

            - FormFields.jsx (Shared sub-component: Inputs for username/password; reusable with Register)

            - useAuth.js (Hook: Handles login API; returns submit function, errors)

          - Route: Register.jsx (Path: '/register'; Component: `useState` for form inputs/errors; API post to /auth/register, then auto-login)

            - Register.css (Styles: Centered form)

            - FormFields.jsx (Shared: As above, plus any extra fields like email)

            - useAuth.js (Hook: Handles register API)

          - Route: ReelCanon.jsx (Path: '/reel-canon'; Component: `useState` for search input, filtered movies; `useEffect` fetch all; renders intro, search bar, grid)

            - ReelCanon.css (Styles: Intro para, search top, responsive grid)

            - SearchBar.jsx (Sub-component: Input; callback to parent for filter; local state for input)

            - MovieGrid.jsx (Sub-component: Grid layout; maps to MovieItem; props filtered movies)

              - MovieItem.jsx (Sub-component: Square card; `useState` for hover/pull-up desc (CSS for web, touch for mobile); props movie data; button to scratch off if auth, API post to /reel-progress/)

            - useMovies.js (Hook: `useEffect` API to /movies/reel-canon and /movies/search/?title=; returns data)

          - Route: UserProfile.jsx (Path: '/profile'; Private; Component: `useState` for loading, active tabs across cards; `useEffect` for fetches; renders 3 cards side-by-side)

            - UserProfile.css (Styles: Flex/grid for 3 cards, responsive stack on mobile)

            - UserCard.jsx (Sub-component: `useState` for active tab; tabs: details, watched, stats)

              - DetailsTab.jsx (Sub: Displays user info; edit buttons; `useState` for form mode; API put to /user/my-profile for updates, /auth/logout button)

              - WatchedTab.jsx (Sub: List of watched movies; props from progress; delete button API to /reel-progress/:movieId)

              - StatsTab.jsx (Sub: Calculated stats like watch time; props progress data)

            - FriendsCard.jsx (Sub-component: `useState` for active tab, search inputs; tabs: friends, requests, add)

              - MyFriendsTab.jsx (Sub: List with search filter; `useState` for search; props friends; delete button API to /friendships/my-friends/:otherUserId)

              - RequestsTab.jsx (Sub: Pending list; accept button API to /friendships/my-friends/:requesterUserId)

              - AddFriendsTab.jsx (Sub: Search input; send request API post to /friendships/:recipientUserId (adapt for name))

            - ProgressionCard.jsx (Sub-component: Progress bar (e.g., CSS div width %); calculates watched/100; props progress; update on scratch off via parent)

            - useUserProfile.js (Hook: `useEffect` API to /user/my-profile; returns user data)

            - useReelProgress.js (Hook: `useEffect` API to /reel-progress/; post for add movie/rating via /reel-progress/ and patch /reel-progress/:movieId)

            - useFriends.js (Hook: `useEffect` API to /friendships/my-friends; handles requests/accepts/deletes)

          - Route: Leaderboard.jsx (Path: '/leaderboard'; Component: `useState` for data; `useEffect` fetch; renders chart, podium)

            - Leaderboard.css (Styles: Chart full, podium top)

            - Chart.jsx (Sub-component: Table or simple bar chart for ranks; props all users)

            - Podium.jsx (Sub-component: Visual top 3; props top users)

            - useLeaderboard.js (Hook: `useEffect` API to /leaderboard/; returns sorted users)

          - Route: About.jsx (Path: '/about'; Component: Static text; no state/API)
            - About.css (Styles: Centered static content)

    - Utilities Branch (Non-UI shared files)

      - Services: apiService.js (Fetch wrappers with auth headers from Context; e.g., async getMovies(), postFriendRequest(), handle errors)

      - Hooks: useApi.js (Generic hook for any fetch; `useState` for loading/data/error; `useEffect` for call)

      - Constants: routes.js (App paths: e.g., { HOME: '/', PROFILE: '/profile' })

      - Constants: apiEndpoints.js (Backend paths: e.g., AUTH_LOGIN: '/auth/login')

      - Helpers: calculateStats.js (Utils for watch time, progress % from reel-progress data)

      - Tests: App.test.js (Example unit test for App rendering)
