import { Room, Player, Stage, ActionType } from './types/types';

const data = {
  rooms: [
    {
      id: '1',
      name: 'Room 1',
      game: {
        stage: Stage.PreFlop,
        pot: 0,
        players: [
          {
            id: '1',
            name: 'Player 1',
            chips: 1000,
            bet: 0,
            isDealer: true,
            isSmallBlind: true,
            isBigBlind: false,
            isFolded: false,
            isAllIn: false,
            isWinner: false,
            isTurn: true,
          },
          {
            id: '2',
            name: 'Player 2',
            chips: 1000,
            bet: 0,
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: true,
            isFolded: false,
            isAllIn: false,
            isWinner: false,
            isTurn: false,
          },
        ],
        dealer: 0,
        smallBlind: 50,
        bigBlind: 100,
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
    },
  ] as Room[],

  players: [
    {
      id: '1',
      name: 'Player 1',
      chips: 1000,
      bet: 0,
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
      isFolded: false,
      isAllIn: false,
      isWinner: false,
      isTurn: false,
    },
    {
      id: '2',
      name: 'Player 2',
      chips: 1000,
      bet: 0,
      isDealer: false,
      isSmallBlind: false,
      isBigBlind: false,
      isFolded: false,
      isAllIn: false,
      isWinner: false,
      isTurn: false,
    },
  ] as Player[],
};

export default data;
