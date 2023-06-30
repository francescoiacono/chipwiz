'use client';

import { Game } from '@/data/types/types';
import React, { useContext } from 'react';

interface GameStateContextProps {
  gameState: Game;
  updateGameState: (newState: Game) => void;
}

interface GameStateProviderProps {
  game: Game;
  children: React.ReactNode;
}

export const GameStateContext = React.createContext<
  GameStateContextProps | undefined
>(undefined);

export const GameStateProvider = ({
  game,
  children,
}: GameStateProviderProps) => {
  const [gameState, setGameState] = React.useState<Game>(game);

  const updateGameState = (newState: Game) => {
    setGameState(newState);
  };

  return (
    <GameStateContext.Provider value={{ gameState, updateGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
