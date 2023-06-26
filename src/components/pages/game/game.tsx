'use client';

import useSWR from 'swr';
import roomService from '@/services/rooms/roomService';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Game, Player, Stage } from '@/data/types/types';
import GameInfo from './subcomponents/gameInfo/gameInfo';
import styles from './game.module.css';
import CurrentPlayer from './subcomponents/currentPlayer/currentPlayer';
import PlayerActions from './subcomponents/playerActions/playerActions';

const Game = () => {
  const { slug } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  const {
    data: roomData,
    error,
    isLoading,
  } = useSWR(`/api/room/${slug}`, () => roomService.fetchRoom(slug));

  useEffect(() => {
    if (roomData) {
      setGame(roomData.game);
      console.log('Room data:', roomData);
    }
  }, [roomData]);

  const handleEndTurn = () => {
    console.log('[Game]:', game?.turn);

    setGame((prevGame) => {
      if (prevGame) {
        const players = prevGame.players;
        const playerTurn = players.findIndex((player) => player.isTurn);

        if (playerTurn === players.length - 1) {
          players[0].isTurn = true;
        } else {
          players[playerTurn + 1].isTurn = true;
        }

        players[playerTurn].isTurn = false;

        return {
          ...prevGame,
          turn: (playerTurn + 1) % players.length,
          players,
        };
      }
      return prevGame;
    });

    console.log('[Game updated]:', game?.turn);
  };

  const handleEverything = () => {
    const players = game?.players;

    if (players) {
      const dealerIndex = players.findIndex((player) => player.isDealer);
      const smallBlindIndex = players.findIndex(
        (player) => player.isSmallBlind
      );
      const bigBlindIndex = players.findIndex((player) => player.isBigBlind);

      const playerTurn = players.findIndex((player) => player.isTurn);

      if (game?.stage === Stage.PreFlop) {
        players[smallBlindIndex].chips -= game.smallBlind;
        players[smallBlindIndex].bet += game.smallBlind;

        players[bigBlindIndex].chips -= game.bigBlind;
        players[bigBlindIndex].bet += game.bigBlind;

        // set pot
      }
    }
  };

  // Function to handle the raise action
  const handleRaise = (raiseAmount: number) => {
    setGame((prevGame) => {
      if (prevGame) {
        const players = prevGame.players;
        const playerTurn = game?.turn;

        if (playerTurn === undefined) {
          return prevGame;
        }

        players[playerTurn].chips -= raiseAmount;
        players[playerTurn].bet = raiseAmount;

        // set pot

        return {
          ...prevGame,
          pot: prevGame.pot + raiseAmount,
          bet: prevGame.bet < raiseAmount ? raiseAmount : prevGame.bet,
          players,
        };
      }
      return prevGame;
    });

    handleEndTurn();
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {roomData && (
        <section className={styles.gameSection}>
          <h1>{roomData.name}</h1>
          <GameInfo
            pot={game?.pot}
            stage={game?.stage}
            bigBlind={game?.bigBlind}
            smallBlind={game?.smallBlind}
            numberOfPlayers={game?.players.length}
          />
          <CurrentPlayer bet={game?.bet} player={game?.players[game.turn]} />
          <PlayerActions
            handleRaise={handleRaise}
            actions={game?.possibleActions}
            playerChips={game?.players[game.turn].chips}
          />
        </section>
      )}
    </>
  );
};

export default Game;
