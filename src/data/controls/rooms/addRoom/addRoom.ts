import data from '@/data/data';
import { ActionType, Player, Room, Stage } from '@/data/types/types';

const addRoom = (name: string, players: Player[]): Room => {
  const room: Room = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    game: {
      stage: Stage.PreFlop,
      pot: 0,
      movesInCurrentStage: 1,
      playersInGame: players.length,
      highestBet: 0,
      players: players,
      dealer: 0,
      smallBlind: 0,
      bigBlind: 0,
      bet: 0,
      raise: 0,
      call: 0,
      turn: 0,
      possibleActions: [
        ActionType.Fold,
        ActionType.Check,
        ActionType.Raise,
        ActionType.Call,
        ActionType.AllIn,
      ],
    },
  };

  data.rooms.push(room);

  return room;
};

export default addRoom;
