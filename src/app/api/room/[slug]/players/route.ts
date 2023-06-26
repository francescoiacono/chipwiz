import { NextResponse } from 'next/server';
import roomController from '@/data/controls/rooms/controller';

export const PUT = async (
  res: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const { slug } = params;
  const { players } = await res.json();

  if (!players) {
    return NextResponse.json({ error: 'No players provided' }, { status: 400 });
  }

  const updatedPlayersInRoom = roomController.updatePlayers(slug, players);
  if (!updatedPlayersInRoom) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json({ players: updatedPlayersInRoom }, { status: 200 });
};

export const GET = async (
  res: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const { slug } = params;

  const playersInRoom = roomController.getRoomPlayers(slug);

  if (!playersInRoom) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json({ playersInRoom }, { status: 200 });
};
