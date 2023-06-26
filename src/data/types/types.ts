export interface Room {
  id: string;
  name: string;
  game: Game;
}

export interface Player {
  id: string;
  name: string;
  chips: number;
  bet: number;
  isDealer: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
  isFolded: boolean;
  isAllIn: boolean;
  isWinner: boolean;
  isTurn: boolean;
}

export interface Game {
  stage: Stage;
  pot: number;
  players: Player[];
  dealer: number;
  smallBlind: number;
  bigBlind: number;
  bet: number;
  raise: number;
  call: number;
  turn: number;
}

export enum Stage {
  PreFlop = 'Pre-Flop',
  Flop = 'Flop',
  Turn = 'Turn',
  River = 'River',
  Showdown = 'Showdown',
}
