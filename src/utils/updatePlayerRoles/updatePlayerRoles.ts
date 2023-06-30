import { Player } from '@/data/types/types';

const updatePlayerRoles = (
  dealerIndex: number,
  smallBlind: number,
  players: Player[]
): Player[] => {
  const updatedDealerIndex = dealerIndex === -1 ? 0 : dealerIndex;
  const updatedPlayers = players;
  const numberOfPlayers = players.length;

  const smallBlindIndex = (updatedDealerIndex + 1) % numberOfPlayers;
  const bigBlindIndex = (updatedDealerIndex + 2) % numberOfPlayers;
  const turnIndex = (updatedDealerIndex + 3) % numberOfPlayers;

  updatedPlayers.forEach((player) => {
    player.isDealer = false;
    player.isSmallBlind = false;
    player.isBigBlind = false;
    player.isTurn = false;
    player.isWinner = false;
    player.isFolded = false;
  });

  if (numberOfPlayers > 2) {
    updatedPlayers[updatedDealerIndex].isDealer = true;
    updatedPlayers[smallBlindIndex].isSmallBlind = true;
    updatedPlayers[smallBlindIndex].chips -= smallBlind;
    updatedPlayers[smallBlindIndex].bet = smallBlind;
    updatedPlayers[bigBlindIndex].isBigBlind = true;
    updatedPlayers[bigBlindIndex].chips -= smallBlind * 2;
    updatedPlayers[bigBlindIndex].bet = smallBlind * 2;
    updatedPlayers[turnIndex].isTurn = true;
  } else {
    updatedPlayers[updatedDealerIndex].isDealer = true;
    updatedPlayers[updatedDealerIndex].isSmallBlind = true;
    updatedPlayers[updatedDealerIndex].chips -= smallBlind;
    updatedPlayers[updatedDealerIndex].bet = smallBlind;
    updatedPlayers[smallBlindIndex].isBigBlind = true;
    updatedPlayers[smallBlindIndex].chips -= smallBlind * 2;
    updatedPlayers[smallBlindIndex].bet = smallBlind * 2;
    updatedPlayers[bigBlindIndex].isTurn = true;
  }

  return updatedPlayers;
};

export default updatePlayerRoles;
