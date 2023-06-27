'use client';

import { Game } from '@/data/types/types';
import React, { useContext } from 'react';

interface GameStateContextProps {
  gameState: Game | null;
  setGameState: React.Dispatch<React.SetStateAction<Game | null>>;
}

interface GameStateProviderProps {
  game: Game | null;
  children: React.ReactNode;
}

const GameStateContext = React.createContext<GameStateContextProps | undefined>(
  undefined
);

export const GameStateProvider = ({
  game,
  children,
}: GameStateProviderProps) => {
  const [gameState, setGameState] = React.useState<Game | null>(game);

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
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
