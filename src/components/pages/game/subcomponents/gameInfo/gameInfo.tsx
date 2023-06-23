import { Stage } from '@/data/types/types';

import styles from './gameInfo.module.css';

interface GameInfoProps {
  stage: Stage | undefined;
  pot: number | undefined;
  smallBlind: number | undefined;
  bigBlind: number | undefined;
  numberOfPlayers: number | undefined;
}

const GameInfo = ({
  stage,
  pot,
  smallBlind,
  bigBlind,
  numberOfPlayers,
}: GameInfoProps) => {
  return (
    <section className={styles.gameInfo}>
      <label>Stage: {stage}</label>
      <label>Pot: {pot}</label>
      <label>
        Blinds: {smallBlind}/{bigBlind}
      </label>
      <label>Players: {numberOfPlayers}</label>
    </section>
  );
};

export default GameInfo;
