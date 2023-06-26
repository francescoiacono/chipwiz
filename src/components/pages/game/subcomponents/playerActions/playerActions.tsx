import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import styles from './playerActions.module.css';
import Slider from '@/components/ui/slider/slider';
import { ActionType } from '@/data/types/types';
import { useState } from 'react';
import RaiseAction from './raiseAction/raiseAction';

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
  return (
    <div className={styles.actions}>
      {actions ? (
        actions.map((action, index) =>
          action === ActionType.Raise ? (
            <RaiseAction
              key={index}
              handleRaise={handleRaise}
              playerChips={playerChips}
            />
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
