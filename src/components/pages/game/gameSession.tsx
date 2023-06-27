'use client';

import useSWR from 'swr';
import roomService from '@/services/rooms/roomService';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './gameSession.module.css';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import GameInfo from './subcomponents/gameInfo/gameInfo';
import CurrentPlayer from './subcomponents/currentPlayer/currentPlayer';
import PlayerActions from './subcomponents/playerActions/playerActions';

const GameSession = () => {
  const { slug } = useParams();
  const { gameState, setGameState } = useGameState();

  const {
    data: roomData,
    error,
    isLoading,
  } = useSWR(`/api/room/${slug}`, () => roomService.fetchRoom(slug));

  useEffect(() => {
    if (roomData) {
      setGameState(roomData.game);
    }
  }, [roomData]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {roomData && gameState && (
        <section className={styles.gameSection}>
          <GameInfo />
          <CurrentPlayer />
          <PlayerActions />
        </section>
      )}
    </>
  );
};

export default GameSession;
