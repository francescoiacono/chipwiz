import data from '@/data/data';
import { Player } from '@/data/types/types';

const addPlayer = (playerName: string): Player | undefined => {
  const newPlayer: Player = {
    id: (data.players.length + 1).toString(),
    name: playerName,
    room: '',
    chips: 1000,
    bet: 0,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
    isFolded: false,
    isAllIn: false,
    isWinner: false,
    isTurn: false,
  };

  data.players.push(newPlayer);

  return newPlayer;
};

export default addPlayer;
