import { Stage } from '@/data/types/types';
import CurrentPlayer from '../currentPlayer/currentPlayer';
import GameInfo from '../gameInfo/gameInfo';
import PlayerActions from '../playerActions/playerActions';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import GamePot from '../gamePot/gamePot';
import styles from './gameInterface.module.css';
import Divider from '@/components/ui/divider/divider';

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
          </section>
        </>
      ) : (
        <label>Game Over! Select a winner:</label>
      )}
    </>
  );
};

export default GameInterface;
