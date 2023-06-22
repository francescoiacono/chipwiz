import styles from './submitButton.module.css';

interface SubmitButtonProps {
  children: React.ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton = ({ children, handleClick }: SubmitButtonProps) => {
  return (
    <button className={styles.submitButton} type='submit' onClick={handleClick}>
      {children}
    </button>
  );
};

export default SubmitButton;
