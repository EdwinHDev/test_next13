import { NextResponse } from 'next/server';
import { connect } from '../../../dataBase/db';
import User from '@/model/User';

export async function GET() {

  await connect();
  const users = await User.find();

  if(!users) {
    return new Response('No hay usuarios para mostrar', { status: 400 });
  }

  try {
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Algo salio mal, intenta más tarde', { status: 500 });
  }
}