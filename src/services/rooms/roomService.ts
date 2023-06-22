import createRoom from './createRoom/createRoom';
import fetchRoom from './fetchRoom/fetchRoom';
import addPlayerToRoom from './addPlayerToRoom/addPlayerToRoom';

const roomService = {
  fetchRoom,
  createRoom,
  addPlayerToRoom,
};

export default roomService;
