import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import styles from './playerActions.module.css';

const PlayerActions = () => {
  return (
    <div className={styles.actions}>
      <PrimaryButton>Check</PrimaryButton>
      <PrimaryButton>Call</PrimaryButton>
      <PrimaryButton>Raise</PrimaryButton>
      <PrimaryButton>Fold</PrimaryButton>
    </div>
  );
};

export default PlayerActions;
