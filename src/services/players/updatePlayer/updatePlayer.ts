import { Player } from '@/data/types/types';

const updatePlayer = async (
  roomId: string,
  playerIndex: number,
  newProperty: Partial<Player>
) => {
  try {
    const res = await fetch(`/api/player/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify({ playerIndex, newProperty }),
    });
    const { player } = await res.json();
    return player;
  } catch (error) {
    throw error;
  }
};

export default updatePlayer;
