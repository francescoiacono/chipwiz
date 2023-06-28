import RaiseAction from './raiseAction/raiseAction';
import CallAction from './callAction/callAction';
import FoldAction from './foldAction/foldAction';

import styles from './playerActions.module.css';
import CheckAction from './checkAction/checkAction';

const PlayerActions = () => {
  return (
    <div className={styles.actions}>
      <CallAction />
      <RaiseAction />
      <CheckAction />
      <FoldAction />
    </div>
  );
};

export default PlayerActions;
