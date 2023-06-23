'use client';

import useSWR from 'swr';
import roomService from '@/services/rooms/roomService';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const Game = () => {
  const { slug } = useParams();
  const {
    data: roomData,
    error,
    isLoading,
  } = useSWR(`/api/room/${slug}`, () => roomService.fetchRoom(slug));

  useEffect(() => {
    if (roomData) {
      console.log(roomData);
    }
  }, [roomData]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {roomData && <p>Room: {roomData.name}</p>}
    </>
  );
};

export default Game;
