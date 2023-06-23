import styles from './input.module.css';

interface InputProps {
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  value?: string;
  required?: boolean;
  checked?: boolean;
  name?: string;
  placeholder?: string;
}

const Input = ({
  type,
  handleChange,
  min,
  max,
  value,
  name,
  checked,
  required,
  placeholder,
}: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      min={min}
      max={max}
      value={value}
      required={required}
      onChange={handleChange}
      name={name}
      checked={checked}
      placeholder={placeholder}
    />
  );
};

export default Input;
