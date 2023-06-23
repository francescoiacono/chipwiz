'use client';

import useSWR from 'swr';
import roomService from '@/services/rooms/roomService';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Game } from '@/data/types/types';
import GameInfo from './subcomponents/gameInfo/gameInfo';

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
    }
  }, [roomData]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {roomData && (
        <section>
          <h1>{roomData.name}</h1>
          <GameInfo
            pot={game?.pot}
            stage={game?.stage}
            bigBlind={game?.bigBlind}
            smallBlind={game?.smallBlind}
            numberOfPlayers={game?.players.length}
          />
          <div>Current Player: {game?.players[game.turn].name}</div>
          <div>
            <button>fold</button>
            <button>call</button>
            <button>check</button>
            <button>raise</button>
          </div>
        </section>
      )}
    </>
  );
};

export default Game;
