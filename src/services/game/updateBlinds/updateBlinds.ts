const updateBlinds = async (roomId: string, smallBlind: number) => {
  try {
    const res = await fetch(`/api/game/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify({ smallBlind }),
    });
    const { game } = await res.json();
    return game;
  } catch (error) {
    throw error;
  }
};

export default updateBlinds;
