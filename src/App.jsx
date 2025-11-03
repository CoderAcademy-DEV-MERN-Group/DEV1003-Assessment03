// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;

// Example app file for login button

import "../src/styles/App.css";
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
      <Register />
    </>
  );
}

export default App;
