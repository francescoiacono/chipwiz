import { Player } from '@/data/types/types';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

import styles from './currentPlayer.module.css';

const CurrentPlayer = () => {
  const { gameState } = useGameState();

  if (!gameState) return <></>;

  const { players, bet } = gameState;
  const currentPlayer = players[gameState.turn];

  return (
    <>
      {currentPlayer ? (
        <section className={styles.currentPlayer}>
          <div className={styles.playerTitle}>
            <h1>{currentPlayer.name}</h1>
            {currentPlayer.isDealer && (
              <label className={styles.dealerButton}>D</label>
            )}
            {currentPlayer.isSmallBlind && (
              <label className={styles.sbButton}>SB</label>
            )}
            {currentPlayer.isBigBlind && (
              <label className={styles.bbButton}>BB</label>
            )}
          </div>
          <div className={styles.playerStats}>
            <div>
              <label>Total Chips:</label>
              <span>{currentPlayer.chips}</span>
            </div>
            <div>
              <label>To call:</label>
              <span>{bet && bet - currentPlayer.bet}</span>
            </div>
          </div>
        </section>
      ) : (
        <label>Waiting for players...</label>
      )}
    </>
  );
};

export default CurrentPlayer;
