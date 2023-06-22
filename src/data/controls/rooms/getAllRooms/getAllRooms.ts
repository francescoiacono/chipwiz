import data from '@/data/data';
import { Room } from '@/data/types/types';

const getAllRooms = (): Room[] | undefined => {
  return data.rooms;
};

export default getAllRooms;
