'use client';

import Input from '@/components/ui/input/input';
import SubmitButton from '@/components/ui/submitButton/submitButton';

const SetupForm = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <form>
      <label>Number of Players</label>
      <Input type='number' handleChange={handleChange} min={2} max={10} />

      <label>Small blind</label>
      <Input type='number' handleChange={handleChange} min={5} />

      <SubmitButton handleClick={handleClick}>Submit</SubmitButton>
    </form>
  );
};

export default SetupForm;
