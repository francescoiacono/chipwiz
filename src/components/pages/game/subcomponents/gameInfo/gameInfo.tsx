import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

import styles from './gameInfo.module.css';

const GameInfo = () => {
  const { gameState } = useGameState();

  if (!gameState) return <></>;

  const { stage, smallBlind, bigBlind, players } = gameState;

  return (
    <section className={styles.gameInfo}>
      <div></div>
      <div className={styles.gameInfoContainer}>
        <label>Stage: {stage}</label>
        <label>
          Blinds: {smallBlind}/{bigBlind}
        </label>
        <label>Players: {players.length}</label>
      </div>
      <div></div>
    </section>
  );
};

export default GameInfo;
