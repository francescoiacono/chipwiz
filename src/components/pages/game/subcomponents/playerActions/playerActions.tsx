import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import styles from './playerActions.module.css';
import Slider from '@/components/ui/slider/slider';
import { ActionType } from '@/data/types/types';
import { useState } from 'react';

interface PlayerActionsProps {
  handleClick: () => void;
  handleRaise: (raiseAmount: number) => void;
  actions: ActionType[] | undefined;
  playerChips: number | undefined;
}

const PlayerActions = ({
  handleClick,
  handleRaise,
  actions,
  playerChips,
}: PlayerActionsProps) => {
  const [raiseAmount, setRaiseAmount] = useState<number>(0);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaiseAmount(parseInt(e.target.value));
  };

  return (
    <div className={styles.actions}>
      {actions ? (
        actions.map((action, index) =>
          action === ActionType.Raise ? (
            <div className={styles.raiseContainer} key={index}>
              <PrimaryButton
                key={index}
                onClick={
                  !showSlider
                    ? () => setShowSlider(true)
                    : () => handleRaise(raiseAmount)
                }
              >
                {action}
              </PrimaryButton>

              {showSlider && (
                <Slider
                  value={raiseAmount}
                  handleChange={handleChange}
                  max={playerChips}
                />
              )}
            </div>
          ) : (
            <PrimaryButton key={index} onClick={handleClick}>
              {action}
            </PrimaryButton>
          )
        )
      ) : (
        <p>Could not load player actions</p>
      )}
    </div>
  );
};

export default PlayerActions;
