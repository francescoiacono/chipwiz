import { Player, Room } from '@/data/types/types';

const createRoom = async (
  roomName: string,
  players: Player[]
): Promise<Room> => {
  try {
    const res = await fetch(`/api/room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomName, players }),
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
