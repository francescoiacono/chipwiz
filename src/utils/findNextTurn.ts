import { Player } from '@/data/types/types';

export const findNewDealer = (
  dealerIndex: number,
  players: Player[],
  tracker: number
): number => {
  if (
    players[dealerIndex].isFolded ||
    players[dealerIndex].isAllIn ||
    players[dealerIndex].chips === 0
  ) {
    if (tracker === players.length) {
      return -1;
    }

    const updatedTracker = tracker + 1;

    return findNewDealer(
      (dealerIndex + 1) % players.length,
      players,
      updatedTracker
    );
  }
  return dealerIndex;
};

export const findNextTurn = (
  currentIndex: number,
  players: Player[]
): number => {
  const nextIndex = (currentIndex + 1) % players.length;
  console.log('nextIndex', nextIndex);
  if (
    players[nextIndex].isFolded ||
    players[nextIndex].isAllIn ||
    players[nextIndex].chips === 0
  ) {
    return findNextTurn(nextIndex, players);
  }

  return nextIndex;
};
