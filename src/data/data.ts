import { Room } from './types/types';

const data = {
  rooms: [
    {
      id: '1',
      name: 'Room 1',
      game: {
        stage: 0,
        pot: 0,
        players: [
          {
            id: '1',
            name: 'Player 1',
            roomId: '1',
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
            room: '1',
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
        ],
        dealer: 0,
        smallBlind: 0,
        bigBlind: 0,
        bet: 0,
        raise: 0,
        call: 0,
        turn: 0,
      },
    },
  ] as Room[],
};

export default data;
