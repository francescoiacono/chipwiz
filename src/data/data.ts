import { Room, Player, Stage, ActionType } from './types/types';

const data = {
  rooms: [
    {
      id: '1',
      name: 'Room 1',
      game: {
        stage: Stage.PreFlop,
        movesInCurrentStage: 1,
        playersInGame: 4,
        highestBet: 100,
        pot: 150,
        players: [
          {
            id: '1',
            name: 'Player 1',
            chips: 1000,
            bet: 0,
            isDealer: true,
            isSmallBlind: false,
            isBigBlind: false,
            isFolded: false,
            isAllIn: false,
            isWinner: false,
            isTurn: true,
            isChecked: false,
          },
          {
            id: '2',
            name: 'Player 2',
            chips: 1000,
            bet: 50,
            isDealer: false,
            isSmallBlind: true,
            isBigBlind: false,
            isFolded: false,
            isAllIn: false,
            isWinner: false,
            isTurn: false,
            isChecked: false,
          },
          {
            id: '3',
            name: 'Player 3',
            chips: 1000,
            bet: 100,
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: true,
            isFolded: false,
            isAllIn: false,
            isWinner: false,
            isTurn: false,
            isChecked: false,
          },
          {
            id: '4',
            name: 'Player 4',
            chips: 1000,
            bet: 0,
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            isFolded: false,
            isAllIn: false,
            isWinner: false,
            isTurn: false,
            isChecked: false,
          },
        ],
        dealer: 0,
        smallBlind: 50,
        bigBlind: 100,
        bet: 100,
        raise: 0,
        call: 0,
        turn: 3,
        possibleActions: [
          ActionType.Fold,
          ActionType.Check,
          ActionType.Raise,
          ActionType.Call,
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
      isChecked: false,
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
      isChecked: false,
    },
  ] as Player[],
};

export default data;
