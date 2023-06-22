import SetupForm from './subcomponents/setupForm/setupForm';
import styles from './setup.module.css';

const Setup = async () => {
  return (
    <section className={styles.setupPage}>
      <h1>Setup</h1>
      <SetupForm />
    </section>
  );
};

export default Setup;
