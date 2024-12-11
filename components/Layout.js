import Link from "next/link";
import Spacer from "./Spacer";
import { useRouter } from "next/router"; // Import useRouter for route handling
import styles from './Header.module.css'; // Import the CSS module

const Header = () => {
  const router = useRouter(); // Get the current route

  return (
    <div className={styles.header}>
      <Link href="/">
        <img className={styles.logo} src="/matchaLogoSmall.svg" alt="Logo" />
      </Link>
      <Link href="/about">
        <a className={`${styles.link} ${router.pathname === '/about' ? styles.active : ''}`}>
          About
        </a>
      </Link>
      <Link href="/submit-score">
        <a className={`${styles.link} ${router.pathname === '/submit-score' ? styles.active : ''}`}>
          Get Started
        </a>
      </Link>
      <Link href="/browse-matches">
        <a className={`${styles.link} ${router.pathname === '/browse-matches' ? styles.active : ''}`}>
          Browse Matches
        </a>
      </Link>
    </div>
  );
};

const Footer = () => (
  <div className={styles.footer}>
    <p>Make dating chill again</p>
  </div>
);

const Layout = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Layout;