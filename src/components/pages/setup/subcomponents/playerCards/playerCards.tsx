import { Player } from '@/data/types/types';
import PlayerCard from '../playerCard/playerCard';
import styles from './playerCards.module.css';
import Divider from '@/components/ui/divider/divider';

interface PlayerCardsProps {
  players: Player[];
  handleChange: (index: number, playerInfo: Player) => void;
  smallBlind: number;
}

const PlayerCards = ({
  players,
  handleChange,
  smallBlind,
}: PlayerCardsProps) => {
  return (
    <>
      <h2>Player Setup</h2>
      <section className={styles.playerCards}>
        {players.map((player, index) => (
          <>
            <PlayerCard
              key={index}
              smallBlind={smallBlind}
              id={index + 1}
              player={player}
              updatePlayer={handleChange}
            />
            {index < players.length - 1 && <Divider />}
          </>
        ))}
      </section>
    </>
  );
};

export default PlayerCards;
