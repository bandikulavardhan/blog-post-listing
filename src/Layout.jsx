import React from 'react';
import NavBar from './NavBar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header>
        <NavBar />
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
          <nav className={styles.footerNav}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
