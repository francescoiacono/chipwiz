import gameController from '@/data/controls/game/controller';
import { NextResponse } from 'next/server';

export const PUT = async (
  res: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  const { slug } = params;
  const { smallBlind } = await res.json();

  const game = gameController.setGameBlinds(slug, smallBlind);
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }

  return NextResponse.json({ game }, { status: 200 });
};
