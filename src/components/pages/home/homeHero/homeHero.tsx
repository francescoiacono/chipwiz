import Image from 'next/image';
import styles from './homeHero.module.css';
import CallToAction from '../callToAction/callToAction';

const HomeHero = () => {
  return (
    <section className={styles.homeHero}>
      <h1>ChipWiz</h1>
      <p>Play poker with your friends, when there are no chips around.</p>
      <CallToAction href='/setup'>Get Started</CallToAction>
    </section>
  );
};

export default HomeHero;
