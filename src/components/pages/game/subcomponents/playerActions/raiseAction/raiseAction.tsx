import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import Slider from '@/components/ui/slider/slider';
import styles from './raiseAction.module.css';
import { useState } from 'react';

const RaiseAction = () => {
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
            : () => {
                setShowSlider(false);
                setRaiseAmount(0);
              }
        }
      >
        Raise
      </PrimaryButton>

      {showSlider && (
        <Slider value={raiseAmount} handleChange={handleRaiseChange} />
      )}
    </div>
  );
};

export default RaiseAction;
