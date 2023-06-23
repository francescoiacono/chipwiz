import styles from './primaryButton.module.css';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <button className={styles.primaryButton} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
