import data from '@/data/data';
import { Player } from '@/data/types/types';

const getPlayer = (id: string): Player | undefined => {
  return data.players.find((player) => player.id === id);
};

export default getPlayer;
