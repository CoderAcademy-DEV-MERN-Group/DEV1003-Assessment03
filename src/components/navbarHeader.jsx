// import clsx from "clsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/navbarlogo215px.png";
import Login from "./modals/Login";
import Logout from "./modals/Logout";
import styles from "../components/styles/Navbar.module.scss";

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
      <section className={styles.pageLinks}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          My Profile
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          Leaderboard
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          Register
        </NavLink>
        <NavLink
          to="/the-reel-canon"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          The Reel Canon
        </NavLink>
      </section>

      {/* Modal buttons will need to be adjusted when authContext has been completed for now it's fine as is. */}
      <section className={styles.modalButtons}>
        <button onClick={() => setShowLogin(true)} className={styles.openLoginButton}>
          Sign In
        </button>
        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
        <button onClick={() => setShowLogout(true)} className={styles.openLogoutButton}>
          Sign Out
        </button>
        <Logout isOpen={showLogout} onClose={() => setShowLogout(false)} />
      </section>
    </nav>
  );
}

export default Header;
