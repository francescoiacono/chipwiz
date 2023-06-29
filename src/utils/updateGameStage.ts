import { Stage } from '@/data/types/types';

const updateGameStage = (
  currentMoves: number,
  playersInGame: number,
  stage: Stage
) => {
  if (currentMoves > playersInGame) {
    switch (stage) {
      case Stage.PreFlop:
        return Stage.Flop;
      case Stage.Flop:
        return Stage.Turn;
      case Stage.Turn:
        return Stage.River;
      case Stage.River:
        return Stage.Showdown;
      default:
        return stage;
    }
  } else {
    return stage;
  }
};

export default updateGameStage;
