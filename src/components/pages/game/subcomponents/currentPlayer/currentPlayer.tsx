import { Player } from '@/data/types/types';

import styles from './currentPlayer.module.css';

interface CurrentPlayerProps {
  player: Player | undefined;
}

const CurrentPlayer = ({ player }: CurrentPlayerProps) => {
  return (
    <>
      {player ? (
        <section className={styles.currentPlayer}>
          <div className={styles.playerTitle}>
            <h1>{player.name}</h1>
            {player.isDealer && (
              <label className={styles.dealerButton}>D</label>
            )}
            {player.isSmallBlind && (
              <label className={styles.sbButton}>SB</label>
            )}
            {player.isBigBlind && <label className={styles.bbButton}>BB</label>}
          </div>
          <div className={styles.playerStats}>
            <div>
              <label>Total Chips:</label>
              <span>{player.chips}</span>
            </div>
            <div>
              <label>Bet:</label>
              <span>{player.chips}</span>
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
