import { Player } from '@/data/types/types';

const updateAllPlayers = async (roomId: string, players: Player[]) => {
  const res = await fetch(`/room/${roomId}/players`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(players),
  });
  const data = await res.json();
  return data;
};

export default updateAllPlayers;
