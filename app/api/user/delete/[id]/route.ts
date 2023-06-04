import { connect } from '../../../../../dataBase/db';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

  const { id } = params;

  await connect();
  const user = await User.findOne({id});

  if(!user) {
    return new Response('No existe ese usuario', { status: 400 });
  }

  try {
    await user.deleteOne();
    return new Response('Usuario eliminado correctamente', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Algo salio mal, intenta más tarde', { status: 500 });
  }
}