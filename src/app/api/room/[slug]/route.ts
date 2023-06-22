import roomController from '@/data/controls/rooms/controller';
import playerController from '@/data/controls/players/controller';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const { slug } = params;
  const room = roomController.getRoom(slug);

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json(room, { status: 200 });
};

export const POST = async (
  req: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const { slug } = params;
  const body = await req.json();

  const player = await playerController.getPlayer(body.playerId);

  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  const updatedRoom = roomController.addPlayerToRoom(slug, player);
  return NextResponse.json(updatedRoom, { status: 200 });
};
