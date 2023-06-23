'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/ui/input/input';
import SubmitButton from '@/components/ui/submitButton/submitButton';
import styles from './setupForm.module.css';
import PlayerCards from '../playerCards/playerCards';
import roomService from '@/services/rooms/roomService';
import playerService from '@/services/players/playerService';
import { Player } from '@/data/types/types';
import gameService from '@/services/game/gameService';

const SetupForm = () => {
  const router = useRouter();

  const [roomName, setRoomName] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [smallBlind, setSmallBlind] = useState(5);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Player 1',
      chips: smallBlind * 2,
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
      name: 'Player 2',
      chips: smallBlind * 2,
      bet: 0,
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
      isFolded: false,
      isAllIn: false,
      isWinner: false,
      isTurn: false,
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'numberOfPlayers') {
      let numberOfPlayers = Number(e.target.value);

      if (Number.isNaN(numberOfPlayers)) {
        setNumberOfPlayers(2);
      } else {
        numberOfPlayers = Math.max(2, Math.min(numberOfPlayers, 10));
        setNumberOfPlayers(numberOfPlayers);

        if (numberOfPlayers > players.length) {
          setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            for (let i = players.length; i < numberOfPlayers; i++) {
              newPlayers.push({
                id: (i + 1).toString(),
                name: `Player ${i + 1}`,
                chips: smallBlind * 2,
                bet: 0,
                isDealer: false,
                isSmallBlind: false,
                isBigBlind: false,
                isFolded: false,
                isAllIn: false,
                isWinner: false,
                isTurn: false,
              });
            }
            return newPlayers;
          });
        } else if (numberOfPlayers < players.length) {
          setPlayers((prevPlayers) => prevPlayers.slice(0, numberOfPlayers));
        }
      }
    } else {
      const { name, value } = e.target;
      if (name === 'roomName') {
        setRoomName(value);
      } else if (name === 'smallBlind') {
        setSmallBlind(Number(value));
      }
    }
  };

  const handleUpdatePlayerCard = (index: number, playerInfo: Player) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        name: playerInfo.name,
        isDealer: playerInfo.isDealer,
        chips: playerInfo.chips,
      };
      return updatedPlayers;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRoom = await roomService.createRoom(roomName, players);

    if (!newRoom) {
      return;
    }

    await gameService.updateGame(newRoom.id, {
      smallBlind,
      bigBlind: smallBlind * 2,
    });

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      await playerService.addPlayer(player);
    }

    router.push(`/game/${newRoom.id}`);
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
            placeholder='Your room name'
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
            value={numberOfPlayers.toString()}
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
            value={smallBlind.toString()}
          />
        </li>
      </ul>
      <PlayerCards
        smallBlind={smallBlind}
        players={players}
        handleChange={handleUpdatePlayerCard}
      />
      <SubmitButton>Start</SubmitButton>
    </form>
  );
};

export default SetupForm;
