import { Player } from '@/data/types/types';

export const findNextTurn = (players: Player[]) => {
  let dealerIndex = players.findIndex((player) => player.isDealer);

  if (players[dealerIndex].isFolded) {
    while (players[dealerIndex].isFolded) {
      dealerIndex = (dealerIndex + 1) % players.length;
    }
  }
  return dealerIndex;
};
