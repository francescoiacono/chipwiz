'use client';

import Input from '@/components/ui/input/input';
import SubmitButton from '@/components/ui/submitButton/submitButton';
import PlayerCards from '../playerCards/playerCards';
import roomService from '@/services/rooms/roomService';
import playerService from '@/services/players/playerService';
import gameService from '@/services/game/gameService';
import updatePlayerRoles from '@/utils/updatePlayerRoles/updatePlayerRoles';
import styles from './setupForm.module.css';

import { useState } from 'react';
import { Player } from '@/data/types/types';
import { useRouter } from 'next/navigation';

const SetupForm = () => {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [smallBlind, setSmallBlind] = useState(5);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Player 1',
      chips: smallBlind * 10,
      bet: 0,
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
      isFolded: false,
      isAllIn: false,
      isWinner: false,
      isTurn: false,
      isChecked: false,
    },
    {
      id: '2',
      name: 'Player 2',
      chips: smallBlind * 10,
      bet: 0,
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
      isFolded: false,
      isAllIn: false,
      isWinner: false,
      isTurn: false,
      isChecked: false,
    },
  ]);

  const handleRoomNameChange = (value: string) => setRoomName(value);
  const handleSmallBlindChange = (value: number) => setSmallBlind(value);
  const handleNumberOfPlayersChange = (value: number) => {
    let numberOfPlayers = value;

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
              chips: smallBlind * 10,
              bet: 0,
              isDealer: false,
              isSmallBlind: false,
              isBigBlind: false,
              isFolded: false,
              isAllIn: false,
              isWinner: false,
              isTurn: false,
              isChecked: false,
            });
          }
          return newPlayers;
        });
      } else if (numberOfPlayers < players.length) {
        setPlayers((prevPlayers) => prevPlayers.slice(0, numberOfPlayers));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'roomName':
        handleRoomNameChange(value);
        break;
      case 'smallBlind':
        handleSmallBlindChange(Number(value));
        break;
      case 'numberOfPlayers':
        handleNumberOfPlayersChange(Number(value));
        break;
      default:
        break;
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

    try {
      // Find Dealer
      let dealerIndex = players.findIndex((player) => player.isDealer);

      // Update players roles according to dealer position
      const updatedPlayers = updatePlayerRoles(
        dealerIndex,
        smallBlind,
        players
      );

      // Create a room with the updated players
      const newRoom = await roomService.createRoom(roomName, updatedPlayers);
      if (!newRoom) {
        return;
      }

      // Update game with Room settings
      await gameService.updateGame(newRoom.id, {
        smallBlind,
        bigBlind: smallBlind * 2,
        turn: updatedPlayers.findIndex((player) => player.isTurn),
        pot: smallBlind + smallBlind * 2,
        bet: smallBlind * 2,
        highestBet: smallBlind * 2,
      });

      // Add players to players collection
      for (let i = 0; i < updatedPlayers.length; i++) {
        const player = updatedPlayers[i];
        await playerService.addPlayer(player);
      }

      // Redirect to game page
      router.push(`/game/${newRoom.id}`);
    } catch (error) {
      console.log(error);
    }
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
