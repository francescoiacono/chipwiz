import styles from './submitButton.module.css';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  return (
    <button className={`${styles.submitButton} ${className}`} type='submit'>
      {children}
    </button>
  );
};

export default SubmitButton;
