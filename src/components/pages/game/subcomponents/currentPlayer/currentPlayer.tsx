import LoadingSpinner from '@/components/ui/loadingSpinner/loadingSpinner';
import styles from './currentPlayer.module.css';
import { useCurrentPlayer } from '@/components/hooks/game';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

const CurrentPlayer = () => {
  const { currentPlayer, loading } = useCurrentPlayer();
  const { name, isDealer, isSmallBlind, isBigBlind, chips, bet } =
    currentPlayer || {};

  const { gameState } = useGameState();
  const { highestBet } = gameState;
  let toCall = highestBet - bet;
  if (currentPlayer.chips < toCall) {
    toCall = currentPlayer.chips;
  }

  if (loading) {
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
          <span>{highestBet && toCall}</span>
        </div>
      </div>
    </section>
  );
};

export default CurrentPlayer;
