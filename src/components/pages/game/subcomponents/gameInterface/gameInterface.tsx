import CurrentPlayer from '../currentPlayer/currentPlayer';
import GameInfo from '../gameInfo/gameInfo';
import PlayerActions from '../playerActions/playerActions';
import GamePot from '../gamePot/gamePot';
import styles from './gameInterface.module.css';
import StageAlert from '../stageAlert/stageAlert';
import SelectWinner from '../selectWinner/selectWinner';
import ShowWinner from '../showWinner/showWinner';
import { Stage } from '@/data/types/types';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import BustedPlayers from '../bustedPlayers/bustedPlayers';

const GameInterface = () => {
  const { gameState } = useGameState();
  const { stage, pot, playerWinner, losers } = gameState;
  return (
    <>
      {gameState && stage != Stage.Showdown ? (
        <>
          <GameInfo />
          <section className={styles.mainInfoContainer}>
            <GamePot pot={pot} />
            <CurrentPlayer />
            <PlayerActions />
            <StageAlert stage={stage} />
            <BustedPlayers losers={losers} />
          </section>
        </>
      ) : (
        <section className={styles.winnerSection}>
          <h2>{`The hand's over!`}</h2>
          {playerWinner ? (
            <ShowWinner playerWinner={playerWinner} pot={pot} />
          ) : (
            <SelectWinner />
          )}
        </section>
      )}
    </>
  );
};

export default GameInterface;
