'use client';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/components/providers/themeProvider/themeProvider';
import styles from './themeSwitch.module.css';

const ThemeSwitch = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div onClick={toggleTheme}>
      {theme === 'light' ? (
        <div className={styles.themeIconLight}></div>
      ) : (
        <div className={styles.themeIconDark}></div>
      )}
    </div>
  );
};

export default ThemeSwitch;
