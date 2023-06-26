import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import Slider from '@/components/ui/slider/slider';
import styles from './raiseAction.module.css';
import { useState } from 'react';

interface RaiseActionProps {
  handleRaise: (raiseAmount: number) => void;
  playerChips: number | undefined;
}

const RaiseAction = ({ handleRaise, playerChips }: RaiseActionProps) => {
  const [raiseAmount, setRaiseAmount] = useState<number>(0);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  const handleRaiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaiseAmount(parseInt(e.target.value));
  };

  return (
    <div className={styles.raiseContainer}>
      <PrimaryButton
        onClick={
          !showSlider
            ? () => setShowSlider(true)
            : () => handleRaise(raiseAmount)
        }
      >
        Raise
      </PrimaryButton>

      {showSlider && (
        <Slider
          value={raiseAmount}
          handleChange={handleRaiseChange}
          max={playerChips}
        />
      )}
    </div>
  );
};

export default RaiseAction;
