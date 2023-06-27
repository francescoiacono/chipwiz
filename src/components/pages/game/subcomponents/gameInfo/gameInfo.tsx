import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

import styles from './gameInfo.module.css';

const GameInfo = () => {
  const { gameState } = useGameState();

  if (!gameState) return <></>;

  const { stage, pot, smallBlind, bigBlind, players } = gameState;

  return (
    <section className={styles.gameInfo}>
      <label>Stage: {stage}</label>
      <label>Pot: {pot}</label>
      <label>
        Blinds: {smallBlind}/{bigBlind}
      </label>
      <label>Players: {players.length}</label>
    </section>
  );
};

export default GameInfo;
