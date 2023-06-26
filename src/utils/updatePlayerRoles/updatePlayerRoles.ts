import playerService from '@/services/players/playerService';

const updatePlayerRoles = async (
  dealerIndex: number,
  roomId: string,
  numberOfPlayers: number
) => {
  let updatedDealerIndex;

  if (dealerIndex === -1) {
    updatedDealerIndex = 0;
  } else {
    updatedDealerIndex = dealerIndex;
  }

  const smallBlindIndex = (updatedDealerIndex + 1) % numberOfPlayers;
  const bigBlindIndex = (updatedDealerIndex + 2) % numberOfPlayers;
};
