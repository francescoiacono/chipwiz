'use client';

import Input from '@/components/ui/input/input';
import SubmitButton from '@/components/ui/submitButton/submitButton';
import styles from './setupForm.module.css';

const SetupForm = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form}>
      <ul>
        <li>
          <label>Number of Players</label>
          <Input type='number' required handleChange={handleChange} min={2} />
        </li>
        <li>
          <label>Small blind</label>
          <Input type='number' required handleChange={handleChange} min={5} />
        </li>
        <li>
          <SubmitButton handleClick={handleClick}>Start</SubmitButton>
        </li>
      </ul>
    </form>
  );
};

export default SetupForm;
