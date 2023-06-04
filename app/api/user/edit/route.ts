import { connect, disconnect } from '../../../../dataBase/db';
import User from '@/model/User';

export async function PUT(request: Request) {
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

  if(!user) {
    await disconnect();
    return new Response('No existe ese usuario', { status: 400 });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.avatar = avatar;
  user.phone = phone;

  try {
    user.updateOne();
    await disconnect();
    return new Response('Usuario editado correctamente', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Algo salio mal, intenta más tarde', { status: 500 });
  }
}