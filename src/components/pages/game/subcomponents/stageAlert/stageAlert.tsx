import { useEffect, useState } from 'react';
import { Stage } from '@/data/types/types';
import styles from './stageAlert.module.css';

interface StageAlertProps {
  stage: Stage;
}

const StageAlert = ({ stage }: StageAlertProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const introductoryMessages = [
    `And now.. the ${stage}!`,
    `The ${stage} is here`,
    `The ${stage} is now!`,
    `Ladies and gentlemen, the ${stage}!`,
    `Hold on to your hats, it's ${stage} time!`,
    `Prepare to be amazed by the incredible ${stage}!`,
  ];

  const randomMessage =
    introductoryMessages[
      Math.floor(Math.random() * introductoryMessages.length)
    ];

  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [stage]);

  const handleBackdropClick = () => {
    setShowAlert(false);
  };

  if (!showAlert) return null;
  if (stage === Stage.Showdown || stage == Stage.PreFlop) return null;

  return (
    <>
      <div
        className={styles.stageAlertBackdrop}
        onClick={handleBackdropClick}
      ></div>
      <div className={styles.stageAlert}>
        <p>{randomMessage}</p>
      </div>
    </>
  );
};

export default StageAlert;
