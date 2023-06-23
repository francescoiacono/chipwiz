import { Player } from '@/data/types/types';

const addPlayer = async (player: Player): Promise<Player> => {
  try {
    const res = await fetch(`/api/player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });

    if (!res.ok) {
      throw new Error('Error adding player');
    }

    const parsedPlayer: Player = await res.json();
    return parsedPlayer;
  } catch (error) {
    throw error;
  }
};

export default addPlayer;
