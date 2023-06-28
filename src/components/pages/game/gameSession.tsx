'use client';

import useSWR from 'swr';
import roomService from '@/services/rooms/roomService';
import styles from './gameSession.module.css';
import GameInterface from './subcomponents/gameInterface/gameInterface';
import { useParams } from 'next/navigation';
import { GameStateProvider } from '@/components/providers/gameStateProvider/gameStateProvider';
import { Room } from '@/data/types/types';
import LoadingSpinner from '@/components/ui/loadingSpinner/loadingSpinner';

const GameSession = () => {
  const { slug } = useParams();
  const fetchURL = `/api/room/${slug}`;
  const {
    data: roomData,
    error,
    isLoading,
  } = useSWR<Room, Error>(fetchURL, () => roomService.fetchRoom(String(slug)));

  return (
    <>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {roomData && (
        <GameStateProvider game={roomData.game}>
          <section className={styles.gameSection}>
            <h1>{roomData.name}</h1>
            <GameInterface />
          </section>
        </GameStateProvider>
      )}
    </>
  );
};

export default GameSession;
