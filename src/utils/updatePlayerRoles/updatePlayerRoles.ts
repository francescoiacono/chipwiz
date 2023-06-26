import { Player } from '@/data/types/types';

const updatePlayerRoles = (
  dealerIndex: number,
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
  });

  if (numberOfPlayers > 2) {
    updatedPlayers[updatedDealerIndex].isDealer = true;
    updatedPlayers[smallBlindIndex].isSmallBlind = true;
    updatedPlayers[bigBlindIndex].isBigBlind = true;
    updatedPlayers[turnIndex].isTurn = true;
  } else {
    updatedPlayers[updatedDealerIndex].isDealer = true;
    updatedPlayers[updatedDealerIndex].isSmallBlind = true;
    updatedPlayers[smallBlindIndex].isBigBlind = true;
    updatedPlayers[bigBlindIndex].isTurn = true;
  }

  return updatedPlayers;
};

export default updatePlayerRoles;
