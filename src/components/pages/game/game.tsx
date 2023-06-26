'use client';

import useSWR from 'swr';
import roomService from '@/services/rooms/roomService';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Game } from '@/data/types/types';
import GameInfo from './subcomponents/gameInfo/gameInfo';
import styles from './game.module.css';
import CurrentPlayer from './subcomponents/currentPlayer/currentPlayer';
import PlayerActions from './subcomponents/playerActions/playerActions';

const Game = () => {
  const { slug } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  const {
    data: roomData,
    error,
    isLoading,
  } = useSWR(`/api/room/${slug}`, () => roomService.fetchRoom(slug));

  useEffect(() => {
    if (roomData) {
      setGame(roomData.game);
      console.log('Room data:', roomData);
    }
  }, [roomData]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {roomData && (
        <section className={styles.gameSection}>
          <h1>{roomData.name}</h1>
          <GameInfo
            pot={game?.pot}
            stage={game?.stage}
            bigBlind={game?.bigBlind}
            smallBlind={game?.smallBlind}
            numberOfPlayers={game?.players.length}
          />
          <CurrentPlayer player={game?.players[game.turn]} />
          <PlayerActions />
        </section>
      )}
    </>
  );
};

export default Game;
