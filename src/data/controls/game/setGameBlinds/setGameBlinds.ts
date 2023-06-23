import data from '@/data/data';
import { Game } from '@/data/types/types';

const setGameBlinds = (
  roomId: string,
  smallBlind: number
): Game | undefined => {
  const room = data.rooms.find((room) => room.id === roomId);

  if (!room) {
    return undefined;
  }

  const game = room.game;

  game.smallBlind = smallBlind;
  game.bigBlind = smallBlind * 2;

  return game;
};

export default setGameBlinds;
