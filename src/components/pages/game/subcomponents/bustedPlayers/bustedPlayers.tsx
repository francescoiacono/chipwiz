import { Player } from '@/data/types/types';

import styles from './bustedPlayers.module.css';

interface BusterPlayersProps {
  losers: Player[];
}

const BusterPlayers = ({ losers }: BusterPlayersProps) => {
  if (losers.length === 0) return null;

  return (
    <section className={styles.list}>
      <h3>Busted Players</h3>
      <ul>
        {losers.map((loser) => (
          <li key={loser.name}>{loser.name}</li>
          // To do: Add button to buy player back in
        ))}
      </ul>
    </section>
  );
};

export default BusterPlayers;
