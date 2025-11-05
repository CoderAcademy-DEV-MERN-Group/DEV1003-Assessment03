import { useState } from "react";
import { NavLink } from "react-router-dom";
import ContactUs from "./modals/ContactUs";
import logo from "../assets/images/templogo180px.png";
import styles from "../components/styles/Footer.module.scss";

function Footer() {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className={styles.footer}>
      <section className={styles.footerLinks}>
        <NavLink to="/about" className={styles.navItem}>
          About Us
        </NavLink>
        <NavLink
          to="/terms"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.navItem)}
        >
          Terms and Conditions
        </NavLink>
        <button onClick={() => setShowContact(true)} className={styles.navItem}>
          Contact Us
        </button>
        <p>
          &copy; 2025 The Century Screening Room. Licensed under{" "}
          <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
            MIT License
          </a>
          .
        </p>
        <ContactUs isOpen={showContact} onClose={() => setShowContact(false)} />
      </section>

      <section className={styles.socialButtons} />
    </footer>
  );
}

export default Footer;
