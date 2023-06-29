import CurrentPlayer from '../currentPlayer/currentPlayer';
import GameInfo from '../gameInfo/gameInfo';
import PlayerActions from '../playerActions/playerActions';
import GamePot from '../gamePot/gamePot';
import styles from './gameInterface.module.css';
import Divider from '@/components/ui/divider/divider';
import StageAlert from '../stageAlert/stageAlert';
import { Stage } from '@/data/types/types';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

const GameInterface = () => {
  const { gameState } = useGameState();
  const { stage, pot } = gameState;
  return (
    <>
      {gameState && stage != Stage.Showdown ? (
        <>
          <GameInfo />
          <Divider />
          <section className={styles.mainInfoContainer}>
            <GamePot pot={pot} />
            <CurrentPlayer />
            <PlayerActions />
            <StageAlert stage={stage} />
          </section>
        </>
      ) : (
        <label>Game Over! Select a winner:</label>
      )}
    </>
  );
};

export default GameInterface;
