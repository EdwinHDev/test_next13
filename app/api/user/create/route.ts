import { idGenerate } from '@/utils/idGenerate';
import { connect, disconnect } from '../../../../dataBase/db';
import User from '@/model/User';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { id, firstName, lastName, avatar, phone } = await request.json();

  if(firstName === "") {
    return new Response('El primer nombre es obligatorio', { status: 401 });
  }

  if(lastName === "") {
    return new Response('El segundo nombre es obligatorio', { status: 401 });
  }

  if(avatar === "") {
    return new Response('El avatar es obligatorio', { status: 401 });
  }

  if(phone === "") {
    return new Response('El número de teléfono es obligatorio', { status: 401 });
  }

  await connect();
  const user = await User.findOne({id});

  if(user) {
    await disconnect();
    return new Response('Ya existe un usuario con ese nombre', { status: 401 });
  }

  const newUser = new User({
    id: idGenerate(),
    firstName: firstName,
    lastName: lastName,
    avatar: avatar,
    phone: phone
  });

  try {
    await newUser.save();
    await disconnect();
    // return new Response('Usuario creado correctamente', { status: 200 });
    return NextResponse.json("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    return new Response('Algo salio mal, intenta más tarde', { status: 500 });
  }
}