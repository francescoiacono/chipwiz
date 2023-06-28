import { Stage } from '@/data/types/types';
import CurrentPlayer from '../currentPlayer/currentPlayer';
import GameInfo from '../gameInfo/gameInfo';
import PlayerActions from '../playerActions/playerActions';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

const GameInterface = () => {
  const { gameState } = useGameState();
  return (
    <>
      {gameState && gameState.stage != Stage.Showdown ? (
        <>
          <GameInfo />
          <CurrentPlayer />
          <PlayerActions />
        </>
      ) : (
        <label>Game Over! Select a winner:</label>
      )}
    </>
  );
};

export default GameInterface;
