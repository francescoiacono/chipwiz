import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useEffect } from 'react';

import styles from './currentPlayer.module.css';
import updateGameStage from '@/utils/updateGameStage';
import LoadingSpinner from '@/components/ui/loadingSpinner/loadingSpinner';
import { Player } from '@/data/types/types';

const CurrentPlayer = () => {
  const { gameState, updateGameState } = useGameState();
  const {
    players,
    highestBet,
    turn,
    movesInCurrentStage,
    playersInGame,
    stage,
  } = gameState;

  const currentPlayer = players[turn];
  const { name, isFolded, isDealer, isSmallBlind, isBigBlind, chips, bet } =
    currentPlayer || {};

  useEffect(() => {
    if (!currentPlayer || currentPlayer.isFolded) {
      updateGameState({
        ...gameState,
        turn: (turn + 1) % players.length,
      });
      return;
    } else {
      // Update the stage if necessary
      const newStage = updateGameStage(
        movesInCurrentStage,
        playersInGame,
        stage
      );
      // Increment the movesInCurrentStage
      const addMove = newStage === stage ? movesInCurrentStage + 1 : 1; // Reset the movesInCurrentStage if the stage has changed
      let newHighestBet = highestBet;
      let resetPlayers: Player[] | null = null;

      if (newStage !== stage) {
        resetPlayers = players.map((player) => {
          player.bet = 0;
          return player;
        });

        newHighestBet = 0;
      }

      updateGameState({
        ...gameState,
        movesInCurrentStage: addMove,
        stage: newStage,
        highestBet: newHighestBet,
        players: resetPlayers || players,
      });

      console.log('Player Bet', bet, 'Highest Bet', highestBet, 'Stage', stage);
    }
  }, [turn, currentPlayer]);

  if (!currentPlayer) {
    return <LoadingSpinner />;
  }

  return (
    <section className={styles.currentPlayer}>
      <div className={styles.playerTitle}>
        <h1>{name}</h1>
        {isDealer && <label className={styles.dealerButton}>D</label>}
        {isSmallBlind && <label className={styles.sbButton}>SB</label>}
        {isBigBlind && <label className={styles.bbButton}>BB</label>}
      </div>
      <div className={styles.playerStats}>
        <div>
          <label>Total Chips:</label>
          <span>{chips}</span>
        </div>
        <div>
          <label>To call:</label>
          <span>{highestBet && highestBet - bet}</span>
        </div>
      </div>
    </section>
  );
};

export default CurrentPlayer;
