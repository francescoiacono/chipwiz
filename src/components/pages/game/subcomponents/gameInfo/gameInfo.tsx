import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

import styles from './gameInfo.module.css';

const GameInfo = () => {
  const { gameState } = useGameState();

  if (!gameState) return <></>;

  const { stage, smallBlind, bigBlind, players } = gameState;

  return (
    <section className={styles.gameInfo}>
      <label>Stage: {stage}</label>
      <label>
        Blinds: {smallBlind}/{bigBlind}
      </label>
      <label>Players: {players.length}</label>
    </section>
  );
};

export default GameInfo;
