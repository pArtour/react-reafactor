import React from 'react'
import styles from "./Header.module.css";
import logo from "../../../images/droppe-logo.png";


export const Header = () => {
  return (
      <header className={styles.header}>
          <div className={`container ${styles.headerImageWrapper}`}>
              <img src={logo} alt="Droppe official shop" className={styles.headerImage} />
          </div>
      </header>
  );
}
