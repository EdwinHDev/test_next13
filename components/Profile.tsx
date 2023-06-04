"use client"

import Image from "next/image";
import { IUser } from "@/interfaces/User";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = async (url: string): Promise<IUser> => {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Error al obtener los datos');
  }
  const data = await res.json();
  return data;
}

export const Profile = () => {

  const { id } = useParams();
  const { data, error } = useSWR<IUser>(`/api/user/${id}`, fetcher);

  if (error) return <div>Error al cargar los datos</div>;
  if (!data) return <div>Cargando...</div>;

  return (
    <div
      className="p-10 border border-slate-300 flex flex-col gap-4 rounded-lg items-center"
    >
      <div
        className="rounded-full overflow-hidden w-40 h-40 object-cover"
      >
        <Image width={160} height={160} src={data.avatar} alt={data.firstName} priority className="w-full h-full object-cover"/>
      </div>
      <div>
        <h2 className="text-slate-600 text-3xl text-center">{data.firstName} {data.lastName}</h2>
        <div
          className="flex justify-center gap-2 items-center mt-5"
        >
          <Image width={24} height={24} src="/phone.svg" alt="phone icon" />
          <p className="text-slate-500 text-xl">{data.phone}</p>
        </div>
      </div>
    </div>
  )
}
