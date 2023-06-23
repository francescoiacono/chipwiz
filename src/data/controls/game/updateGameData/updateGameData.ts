import data from '@/data/data';
import { Game } from '@/data/types/types';

const updateGameData = (
  roomId: string,
  updatedFields: Partial<Game>
): Game | undefined => {
  const room = data.rooms.find((room) => room.id === roomId);

  if (!room) {
    return undefined;
  }

  Object.assign(room.game, updatedFields);

  console.log('GAME DATA UPDATE:', updatedFields);

  return room.game;
};

export default updateGameData;
