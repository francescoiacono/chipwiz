import controller from '@/data/controls/players/controller';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const { slug } = params;
  const player = controller.getPlayer(slug);

  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  return NextResponse.json(player, { status: 200 });
};

export const PUT = async (
  req: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const { slug } = params;
  const { newProperty, playerIndex } = await req.json();

  const player = controller.updatePlayerData(slug, playerIndex, newProperty);
  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  return NextResponse.json({ player }, { status: 200 });
};
