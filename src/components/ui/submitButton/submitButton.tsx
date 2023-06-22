import styles from './submitButton.module.css';

interface SubmitButtonProps {
  children: React.ReactNode;
}

const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <button className={styles.submitButton} type='submit'>
      {children}
    </button>
  );
};

export default SubmitButton;
