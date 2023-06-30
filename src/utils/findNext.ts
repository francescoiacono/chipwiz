import { Player } from '@/data/types/types';

export const findNextTurn = (currentIndex: number, players: Player[]) => {
  let nextIndex = (currentIndex + 1) % players.length;
  while (
    players[nextIndex].isFolded ||
    players[nextIndex].isAllIn ||
    players[nextIndex].chips === 0
  ) {
    nextIndex = (nextIndex + 1) % players.length;
    console.log('ni: ', nextIndex);
  }
  console.log('FINISHED: ', nextIndex);
  return nextIndex;
};

export const findNextDealer = (dealerIndex: number, players: Player[]) => {
  return findNextTurn(dealerIndex, players);
};

export const findNextSmallBlind = (dealerIndex: number, players: Player[]) => {
  return findNextTurn(dealerIndex, players);
};

export const findNextBigBlind = (
  smallBlindIndex: number,
  players: Player[]
) => {
  return findNextTurn(smallBlindIndex, players);
};
