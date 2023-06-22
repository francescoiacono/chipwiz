import { Room } from '@/data/types/types';

const addPlayerToRoom = async (
  roomId: string,
  playerId: string
): Promise<Room> => {
  try {
    const res = await fetch(`/api/room/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerId }),
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

export default addPlayerToRoom;
