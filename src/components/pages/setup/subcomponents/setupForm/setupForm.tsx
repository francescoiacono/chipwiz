'use client';

import Input from '@/components/ui/input/input';
import SubmitButton from '@/components/ui/submitButton/submitButton';
import styles from './setupForm.module.css';
import PlayerCards from '../playerCards/playerCards';
import roomService from '@/services/rooms/roomService';
import { useState } from 'react';
import { Player } from '@/data/types/types';

interface SetupForm {
  roomName: string;
  numberOfPlayers: number;
  smallBlind: number;
  players: Player[];
}

const SetupForm = () => {
  const [pageData, setPageData] = useState<SetupForm>({
    roomName: '',
    numberOfPlayers: 2,
    smallBlind: 5,
    players: [
      {
        id: '1',
        name: '',
        chips: 0,
        bet: 0,
        isDealer: false,
        isSmallBlind: false,
        isBigBlind: false,
        isFolded: false,
        isAllIn: false,
        isWinner: false,
        isTurn: false,
      },
      {
        id: '2',
        name: '',
        chips: 0,
        bet: 0,
        isDealer: false,
        isSmallBlind: false,
        isBigBlind: false,
        isFolded: false,
        isAllIn: false,
        isWinner: false,
        isTurn: false,
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handleUpdatePlayerCard = (index: number, playerInfo: Player) => {
    const updatedPlayers = pageData.players.map((player, i) => {
      if (i === index) {
        return {
          ...player,
          name: playerInfo.name,
          isDealer: playerInfo.isDealer,
          chips: playerInfo.chips,
        };
      } else {
        return {
          ...player,
          isDealer: false,
        };
      }
    });

    setPageData({
      ...pageData,
      players: updatedPlayers,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { roomName } = pageData;
    const newRoom = await roomService.createRoom(roomName);

    if (newRoom) {
      console.log('Room created');
    }

    console.log(pageData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul>
        <li>
          <label>Room Name</label>
          <Input
            type='text'
            name='roomName'
            required
            handleChange={handleChange}
            min={2}
          />
        </li>
        <li>
          <label>Number of Players</label>
          <Input
            type='number'
            name='numberOfPlayers'
            required
            handleChange={handleChange}
            min={2}
            max={10}
            value={pageData.numberOfPlayers.toString()}
          />
        </li>
        <li>
          <label>Small blind</label>
          <Input
            type='number'
            name='smallBlind'
            required
            handleChange={handleChange}
            min={5}
            value={pageData.smallBlind.toString()}
          />
        </li>
      </ul>
      <PlayerCards
        players={pageData.players}
        handleChange={handleUpdatePlayerCard}
      />
      <SubmitButton>Start</SubmitButton>
    </form>
  );
};

export default SetupForm;
