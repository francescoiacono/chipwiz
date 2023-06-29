import { useState } from 'react';
import styles from './dropdown.module.css';

interface DropdownProps {
  options: string[] | number[];
  selected: string | number;
  onSelectedChange: (selected: string | number) => void;
}

const Dropdown = ({ options, selected, onSelectedChange }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option}
        className={styles.dropdownItem}
        onClick={() => {
          setOpen(false);
          onSelectedChange(option);
        }}
      >
        {option}
      </div>
    );
  });

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownButton} onClick={() => setOpen(!open)}>
        {selected}
      </div>
      {open && <div className={styles.dropdownMenu}>{renderedOptions}</div>}
    </div>
  );
};

export default Dropdown;
