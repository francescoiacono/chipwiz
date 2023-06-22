import { Room } from '@/data/types/types';

const createRoom = async (roomName: string): Promise<Room> => {
  try {
    const res = await fetch(`/api/room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomName }),
    });

    if (!res.ok) {
      throw new Error('Error creating room');
    }

    const room: Room = await res.json();
    return room;
  } catch (error) {
    throw error;
  }
};

export default createRoom;
