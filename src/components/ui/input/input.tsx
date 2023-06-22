import styles from './input.module.css';

interface InputProps {
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  value?: string;
  required?: boolean;
}

const Input = ({ type, handleChange, min, max, value }: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      min={min}
      max={max}
      value={value}
      required
      onChange={handleChange}
    />
  );
};

export default Input;
