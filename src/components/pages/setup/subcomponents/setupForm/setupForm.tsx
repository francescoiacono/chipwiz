'use client';

import Input from '@/components/ui/input/input';
import SubmitButton from '@/components/ui/submitButton/submitButton';
import styles from './setupForm.module.css';
import roomService from '@/services/rooms/roomService';
import { useState } from 'react';

const SetupForm = () => {
  const [pageData, setPageData] = useState({
    roomName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { roomName } = pageData;
    const newRoom = await roomService.createRoom(roomName);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul>
        <li>
          <label>Room Name</label>
          <Input
            type='text'
            required
            handleChange={handleChange}
            min={2}
            name='roomName'
          />
        </li>
        <li>
          <label>Number of Players</label>
          <Input type='number' required handleChange={handleChange} min={2} />
        </li>
        <li>
          <label>Small blind</label>
          <Input type='number' required handleChange={handleChange} min={5} />
        </li>
        <li>
          <SubmitButton>Start</SubmitButton>
        </li>
      </ul>
    </form>
  );
};

export default SetupForm;
