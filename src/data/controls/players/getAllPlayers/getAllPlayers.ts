import data from '@/data/data';
import { Player } from '@/data/types/types';

const getAllPlayers = (): Player[] | undefined => {
  return data.players;
};

export default getAllPlayers;
