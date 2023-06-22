import data from '@/data/data';
import { Room } from '@/data/types/types';

const getRoom = (id: string): Room | undefined => {
  return data.rooms.find((room) => room.id === id);
};

export default getRoom;
