import { Game } from '@/data/types/types';

const updateGame = async (
  roomId: string,
  newProperty: Partial<Game>
): Promise<Game> => {
  try {
    const res = await fetch(`/api/game/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify({ newProperty }),
    });
    const { game } = await res.json();
    return game;
  } catch (error) {
    throw error;
  }
};

export default updateGame;
