import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

import RaiseAction from './raiseAction/raiseAction';
import CallAction from './callAction/callAction';
import FoldAction from './foldAction/foldAction';
import CheckAction from './checkAction/checkAction';

import styles from './playerActions.module.css';

const PlayerActions = () => {
  const { gameState } = useGameState();
  const { players, turn, highestBet } = gameState;
  const currentPlayer = players[turn];

  // TODO: Refactor this logic into a hook
  const canRaise = currentPlayer.chips > highestBet;
  const canCall = currentPlayer.bet < highestBet;
  const canCheck = currentPlayer.bet >= highestBet || highestBet === 0;

  return (
    <div className={styles.actionCard}>
      <h2>Actions</h2>
      <div className={styles.actions}>
        {canCall && <CallAction />}
        {canCheck && <CheckAction />}
        {canRaise && <RaiseAction />}
        <FoldAction />
      </div>
    </div>
  );
};

export default PlayerActions;
