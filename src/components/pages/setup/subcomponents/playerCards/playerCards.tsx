import { Player } from '@/data/types/types';
import PlayerCard from '../playerCard/playerCard';
import styles from './playerCards.module.css';

interface PlayerCardsProps {
  players: Player[];
  handleChange: (index: number, playerInfo: Player) => void;
}

const PlayerCards = ({ players, handleChange }: PlayerCardsProps) => {
  return (
    <section className={styles.playerCards}>
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          id={index + 1}
          player={player}
          updatePlayer={handleChange}
        />
      ))}
    </section>
  );
};

export default PlayerCards;
