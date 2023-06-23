import Input from '@/components/ui/input/input';
import styles from './playerCard.module.css';
import { Player } from '@/data/types/types';
import { useEffect, useState } from 'react';

interface PlayerCardProps {
  updatePlayer: (index: number, playerInfo: Player) => void;
  id: number;
  player: Player;
  smallBlind: number;
}

const PlayerCard = ({
  updatePlayer,
  id,
  player,
  smallBlind,
}: PlayerCardProps) => {
  const [playerData, setPlayerData] = useState<Player>(player);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    if (event.target.name === 'chips') {
      const minPlayerChips = smallBlind * 2;
      value = Math.max(Number(value), minPlayerChips).toString();
    }

    setPlayerData({
      ...playerData,
      [event.target.name]: value,
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
          <Input
            type='text'
            handleChange={handleChange}
            name='name'
            value={playerData.name}
          />
        </li>
        <li>
          <label>Starting Chips</label>
          <Input
            type='number'
            handleChange={handleChange}
            name='chips'
            value={playerData.chips.toString()}
            min={smallBlind * 2}
          />
        </li>
        <li>
          <label>Dealer?</label>
          <Input
            type='checkbox'
            handleChange={handleChange}
            name='isDealer'
            checked={playerData.isDealer}
          />
        </li>
      </ul>
    </div>
  );
};

export default PlayerCard;
