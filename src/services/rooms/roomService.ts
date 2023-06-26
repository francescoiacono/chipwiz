import createRoom from './createRoom/createRoom';
import fetchRoom from './fetchRoom/fetchRoom';
import addPlayerToRoom from './addPlayerToRoom/addPlayerToRoom';
import updateAllPlayers from './updateAllPlayers/updateAllPlayers';

const roomService = {
  fetchRoom,
  createRoom,
  addPlayerToRoom,
  updateAllPlayers,
};

export default roomService;
