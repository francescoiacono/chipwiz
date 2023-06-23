import data from '@/data/data';
import { Player, Room } from '@/data/types/types';

const addRoom = (name: string, players: Player[]): Room => {
  const room: Room = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    game: {
      stage: 0,
      pot: 0,
      players: players,
      dealer: 0,
      smallBlind: 0,
      bigBlind: 0,
      bet: 0,
      raise: 0,
      call: 0,
      turn: 0,
    },
  };

  data.rooms.push(room);

  return room;
};

export default addRoom;
