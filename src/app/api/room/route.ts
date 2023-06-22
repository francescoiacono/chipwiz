import controller from '@/data/controls/rooms/controller';
import { NextResponse } from 'next/server';

export const POST = async (req: Request): Promise<NextResponse> => {
  const body = await req.json();
  const newRoom = controller.addRoom(body.roomName);

  if (!newRoom) {
    return NextResponse.json({ error: 'Room already exists' }, { status: 409 });
  }

  return NextResponse.json({ newRoom }, { status: 200 });
};
