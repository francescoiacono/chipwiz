import { Room } from '@/data/types/types';

const fetchRoom = async (roomId: string): Promise<Room> => {
  try {
    const res = await fetch(`/api/room/${roomId}`);
    const room: Room = await res.json();
    return room;
  } catch (error) {
    throw error;
  }
};

export default fetchRoom;
