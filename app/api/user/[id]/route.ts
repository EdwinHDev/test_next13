import { NextResponse } from 'next/server';
import { connect } from '@/dataBase/db';
import User from '@/model/User';

export async function GET(request: Request, { params }: { params: { id: string } }) {

  const { id = "" } = params;

  await connect();
  const user = await User.findOne({id})

  if(!user) {
    return new Response('No existe un usuario con esa id', { status: 400 });
  }

  try {
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Algo salio mal, intenta más tarde', { status: 500 });
  }
}