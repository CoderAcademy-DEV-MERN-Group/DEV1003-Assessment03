import "./App.css";
import { useState } from "react";
import Login from "./pages/signIn/Login";
import Register from "./pages/register/Register";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <button onClick={() => setShowLogin(true)} className="open-login-button">
        Sign In
      </button>
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      {/* <Register /> */}
    </>
  );
}

export default App;
