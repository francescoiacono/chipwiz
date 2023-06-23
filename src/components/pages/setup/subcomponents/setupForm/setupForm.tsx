'use client';

import Input from '@/components/ui/input/input';
import SubmitButton from '@/components/ui/submitButton/submitButton';
import styles from './setupForm.module.css';
import PlayerCards from '../playerCards/playerCards';
import roomService from '@/services/rooms/roomService';
import playerService from '@/services/players/playerService';
import { useState } from 'react';
import { Player } from '@/data/types/types';
import { useRouter } from 'next/navigation';

interface SetupForm {
  roomName: string;
  numberOfPlayers: number;
  smallBlind: number;
  players: Player[];
}

const SetupForm = () => {
  const router = useRouter();

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
    // If the number of players is changed, then the players array is updated
    if (e.target.name === 'numberOfPlayers') {
      let numberOfPlayers = Number(e.target.value);

      // If the value is not a number, then the state is reset
      if (Number.isNaN(numberOfPlayers)) {
        setPageData({
          ...pageData,
          numberOfPlayers: 2,
        });
      }

      // If the value is a number
      else {
        // If the value is greater than 10, then it is set to 10
        if (numberOfPlayers > 10) {
          numberOfPlayers = 10;
        }
        // If the value is less than 2, then it is set to 2
        if (numberOfPlayers < 2) {
          numberOfPlayers = 2;
        }

        // The state is updated
        setPageData((prevState) => {
          const players = prevState.players.slice(0, numberOfPlayers);

          if (numberOfPlayers > players.length) {
            // Add new players to the array
            for (let i = players.length; i < numberOfPlayers; i++) {
              players.push({
                id: i.toString() + 1,
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
              });
            }
          } else if (numberOfPlayers < players.length) {
            // Remove players from the array
            players.splice(numberOfPlayers);
          }

          return {
            ...prevState,
            numberOfPlayers,
            players,
          };
        });
      }
      return;
    }
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
    const { roomName, players } = pageData;
    const newRoom = await roomService.createRoom(roomName, players);

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
