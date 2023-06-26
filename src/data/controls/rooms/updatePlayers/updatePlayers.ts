import data from '@/data/data';
import { Player } from '@/data/types/types';

const updatePlayers = (roomId: string, players: Player[]): Player[] => {
  console.log('Updating Players!:', players);
  console.log('Updating Players! id:', roomId);

  const room = data.rooms.find((room) => room.id === roomId);
  const game = room?.game;

  if (game) {
    game.players = players;
  }

  return data.rooms.find((room) => room.id === roomId)?.game?.players || [];
};

export default updatePlayers;
