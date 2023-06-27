import styles from './playerActions.module.css';
import { ActionType } from '@/data/types/types';
import RaiseAction from './raiseAction/raiseAction';
import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import CallAction from './callAction/callAction';

const PlayerActions = () => {
  return (
    <div className={styles.actions}>
      <CallAction />
      <RaiseAction />
    </div>
  );
};

export default PlayerActions;
