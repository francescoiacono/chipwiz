import data from '@/data/data';
import { Room, Player } from '@/data/types/types';

const addPlayerToRoom = (roomId: string, player: Player): Room => {
  const room = data.rooms.find((room) => room.id === roomId);

  if (!room) {
    throw new Error(`Room with id ${roomId} not found`);
  }
  room.game.players.push(player);

  return room;
};

export default addPlayerToRoom;
