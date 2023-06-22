import Input from '@/components/ui/input/input';
import styles from './playerCard.module.css';
import { Player } from '@/data/types/types';
import { useEffect, useState } from 'react';

interface PlayerCardProps {
  updatePlayer: (index: number, playerInfo: Player) => void;
  id: number;
  player: Player;
}

const PlayerCard = ({ updatePlayer, id, player }: PlayerCardProps) => {
  const [playerData, setPlayerData] = useState<Player>(player);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerData({
      ...playerData,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  useEffect(() => {
    updatePlayer(id - 1, playerData);
  }, [playerData]);

  return (
    <div className={styles.playerCard}>
      <h3>Player {id}</h3>
      <ul>
        <li>
          <label>Player Name</label>
          <Input type='text' handleChange={handleChange} name='name' />
        </li>
        <li>
          <label>Starting Chips</label>
          <Input type='number' handleChange={handleChange} name='chips' />
        </li>
        <li>
          <label>Dealer?</label>
          <Input
            type='checkbox'
            required={false}
            handleChange={handleChange}
            name='isDealer'
          />
        </li>
      </ul>
    </div>
  );
};

export default PlayerCard;
