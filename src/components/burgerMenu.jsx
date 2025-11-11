import { bubble as Menu } from "react-burger-menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/navbarlogo215px.png";
import Login from "./modals/Login";
import Logout from "./modals/Logout";
import "../components/styles/BurgerMenu.scss";
import { useAuthContext } from "../contexts/useAuthContext";
import {
  HOME,
  PROFILE,
  LEADERBOARD,
  REGISTER,
  REEL_CANON,
  ABOUT,
} from "../utilities/constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faTrophy,
  faPlayCircle,
  faInfoCircle,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function BurgerMenu() {
  const { isAuthenticated } = useAuthContext();
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogout(true);
    setIsMenuOpen(false);
  };

  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu isOpen={isMenuOpen} onStateChange={handleStateChange}>
      <NavLink to={HOME} onClick={closeMenu}>
        <FontAwesomeIcon icon={faHome} />
        Home
      </NavLink>
      <NavLink to={PROFILE} onClick={closeMenu}>
        <FontAwesomeIcon icon={faUser} />
        My Profile
      </NavLink>
      <NavLink to={LEADERBOARD} onClick={closeMenu}>
        <FontAwesomeIcon icon={faTrophy} />
        Leaderboard
      </NavLink>
      <NavLink to={REEL_CANON} onClick={closeMenu}>
        <FontAwesomeIcon icon={faPlayCircle} />
        The Reel Canon
      </NavLink>
      <NavLink to={ABOUT} onClick={closeMenu}>
        <FontAwesomeIcon icon={faInfoCircle} />
        About
      </NavLink>
      {isAuthenticated || (
        <NavLink to={REGISTER} onClick={closeMenu}>
          <FontAwesomeIcon icon={faUserPlus} />
          Register
        </NavLink>
      )}
      {isAuthenticated && (
        <a href="#" role="button" onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </a>
      )}
      {!isAuthenticated && (
        <a href="#" role="button" onClick={handleLoginClick}>
          <FontAwesomeIcon icon={faSignInAlt} />
          Login
        </a>
      )}
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Logout isOpen={showLogout} onClose={() => setShowLogout(false)} />
      <img src={logo} alt="Logo" />
    </Menu>
  );
}
