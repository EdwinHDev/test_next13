import { NextResponse } from 'next/server';
import { connect, disconnect } from '../../../dataBase/db';
import User from '@/model/User';

export async function GET() {

  await connect();
  const users = await User.find().lean();
  await disconnect();

  if(!users) {
    return new Response('Ya existe un usuario con ese nombre', { status: 400 });
  }

  try {
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return new Response('Algo salio mal, intenta más tarde', { status: 500 });
  }
}