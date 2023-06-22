import controller from '@/data/controls/players/controller';
import { NextResponse } from 'next/server';

export const POST = async (req: Request): Promise<NextResponse> => {
  const body = await req.json();
  const newPlayer = controller.addPlayer(body.playerName);

  if (!newPlayer) {
    return NextResponse.json(
      { error: 'Player already exists' },
      { status: 409 }
    );
  }

  return NextResponse.json({ newPlayer }, { status: 200 });
};

export const GET = async (): Promise<NextResponse> => {
  const players = controller.getAllPlayers();

  if (!players) {
    return NextResponse.json({ error: 'No players found' }, { status: 404 });
  }

  return NextResponse.json(players, { status: 200 });
};
