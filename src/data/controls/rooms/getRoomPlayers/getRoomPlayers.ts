import data from '@/data/data';

const getRoomPlayers = (roomId: string) => {
  const room = data.rooms.find((room) => room.id === roomId);
  if (!room) return null;
  return room.game.players;
};

export default getRoomPlayers;
