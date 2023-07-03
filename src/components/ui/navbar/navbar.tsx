import ThemeSwitch from '../themeSwitch/themeSwitch';
import styles from './navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link id={styles.logo} href='/'>
            ChipWiz
          </Link>
        </li>
        <li>
          <Link href='/setup'>Create Room</Link>
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
