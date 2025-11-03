# Global Auth Provider

A jsx component that uses createContext react hook to hold authentication state (e.g. JWT, user details).

It shares data like login status across the app so we can have conditional logic based off login status (e.g., show/hide login/logout link). Keeps auth logic centralized and simple

## How It Works

Use useState and useEffect hooks inside the auth provider for state (e.g., check login on load via localStorage). Wrap \<App /> component with it to give context to all components within. . Components within can access this state via useContext hook.

Example: Create `src/context/AuthProvider.jsx`:

```jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for token on load
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

In `main.jsx`:

```jsx
import { AuthProvider } from "./context/AuthProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

In a component:

```jsx
const { user } = useAuth();
if (user) return <p>Welcome, {user.name}!</p>;
```
