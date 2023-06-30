import { Player } from '@/data/types/types';
import {
  findNextBigBlind,
  findNextDealer,
  findNextSmallBlind,
  findNextTurn,
} from '@/utils';

export const updatePlayerRoles = (
  dealerIndex: number,
  smallBlind: number,
  players: Player[]
): Player[] => {
  // If there is no dealer, set the first player as the dealer
  const updatedDealerIndex = dealerIndex === -1 ? 0 : dealerIndex;
  const updatedPlayers = players;
  const numberOfPlayers = players.length;

  // Reset all player roles
  updatedPlayers.forEach((player) => {
    player.isDealer = false;
    player.isSmallBlind = false;
    player.isBigBlind = false;
    player.isTurn = false;
    player.isAllIn = false;
    player.isWinner = false;
    player.isFolded = false;
  });

  // Set the small blind, big blind and current turn player indexes
  const smallBlindIndex = findNextTurn(updatedDealerIndex, players);
  const bigBlindIndex = findNextTurn(smallBlindIndex, players);
  const turnIndex = findNextTurn(bigBlindIndex, players);

  // Set the new player roles and bets
  if (numberOfPlayers > 2) {
    updatedPlayers[updatedDealerIndex].isDealer = true;
    updatedPlayers[smallBlindIndex].isSmallBlind = true;
    updatedPlayers[bigBlindIndex].isBigBlind = true;

    // Deduct blinds from small blind and big blind updatedPlayers
    updatedPlayers[smallBlindIndex].chips -= smallBlind;
    updatedPlayers[bigBlindIndex].chips -= smallBlind * 2;

    // Find the next player whose turn it is
    updatedPlayers[turnIndex].isTurn = true;
  } else {
    // In a 2 player game, the dealer posts the small blind and the other player posts the big blind
    updatedPlayers[updatedDealerIndex].isDealer = true;
    updatedPlayers[updatedDealerIndex].isSmallBlind = true;
    updatedPlayers[updatedDealerIndex].chips -= smallBlind;
    updatedPlayers[updatedDealerIndex].bet = smallBlind;
    updatedPlayers[smallBlindIndex].isBigBlind = true;
    updatedPlayers[smallBlindIndex].chips -= smallBlind * 2;
    updatedPlayers[smallBlindIndex].bet = smallBlind * 2;
    updatedPlayers[updatedDealerIndex].isTurn = true; // Dealer acts first pre-flop in a head-to-head game
  }

  return updatedPlayers;
};
