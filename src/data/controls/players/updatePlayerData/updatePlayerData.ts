import data from '@/data/data';
import { Player } from '@/data/types/types';

const updatePlayerData = (
  roomId: string,
  playerIndex: number,
  updatedFields: Partial<Player>
): Player | undefined => {
  const room = data.rooms.find((room) => room.id === roomId);
  if (!room) {
    return undefined;
  }

  Object.assign(room.game.players[playerIndex], updatedFields);

  console.log('PLAYER DATA UPDATE:', updatedFields);

  return room.game.players[playerIndex];
};

export default updatePlayerData;
