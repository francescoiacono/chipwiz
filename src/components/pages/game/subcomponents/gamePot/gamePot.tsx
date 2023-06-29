interface GamePotProps {
  pot: number;
}

const GamePot = ({ pot }: GamePotProps) => {
  return (
    <div>
      <h2>Pot</h2>
      <p>{pot}</p>
    </div>
  );
};

export default GamePot;
