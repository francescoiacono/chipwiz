import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import Slider from '@/components/ui/slider/slider';
import styles from './raiseAction.module.css';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useState } from 'react';
import { useRaiseAction } from '@/components/hooks/actions';

const RaiseAction = () => {
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const { gameState } = useGameState();
  const { raiseAmount, handleRaise, handleSliderChange } = useRaiseAction();

  return (
    <div className={styles.raiseContainer}>
      <PrimaryButton
        onClick={
          !showSlider
            ? () => setShowSlider(true)
            : () => {
                setShowSlider(false);
                handleRaise();
              }
        }
      >
        Raise
      </PrimaryButton>

      {showSlider && (
        <Slider
          value={raiseAmount}
          handleChange={handleSliderChange}
          max={gameState.players[gameState.turn].chips}
          min={gameState.bigBlind}
        />
      )}
    </div>
  );
};

export default RaiseAction;
