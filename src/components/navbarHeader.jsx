import clsx from "clsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/navbarlogo215px.png";
import Login from "./modals/Login";
import Logout from "./modals/Logout";
import styles from "./Navbar.module.scss";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <NavLink to="/" className={styles.logo} end>
        <img className={styles.logoImg} src={logo} alt="Logo" />
      </NavLink>

      {/* Link section */}
      <section>
        <>Home</>
        <>My Profile</>
        <>Leaderboard</>
        <>Register</>
        <>The Reel Canon</>
      </section>

      <section>
        <button onClick={() => setShowLogin(true)} className="open-login-button">
          Sign In
        </button>
        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
        <button onClick={() => setShowLogout(true)} className="open-logout-button">
          Log Out
        </button>
        <Logout isOpen={showLogout} onClose={() => setShowLogout(false)} />
      </section>
    </nav>
  );
}

export default Header;
