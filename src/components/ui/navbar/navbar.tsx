import styles from './navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <h2>ChipWiz</h2>
        </li>
        <li>
          <Link href='/'>Home</Link>
          <Link href='/setup'>Setup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
