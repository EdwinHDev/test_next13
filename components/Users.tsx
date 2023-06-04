"use client"

import { IUser } from "@/interfaces/User";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";

const getUsers = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch("http://localhost:3000/api/user",
    { 
      cache: "force-cache"
    }
  );
  return await res.json();
};

export const Users = () => {

  const router = useRouter();
  const users = use(getUsers());

  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {
        users?.map((user: IUser) => (
          <div
            key={user.id}
            className="p-4 border border-slate-300 flex gap-4 rounded-lg"
          >
            <div
              className="rounded-3xl overflow-hidden w-40 h-40"
            >
              <Image width={160} height={160} src={user.avatar} alt={user.firstName} priority className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-slate-600 text-3xl">{user.firstName} {user.lastName}</h2>
              <div
                className="flex gap-2 items-center mt-5"
              >
                <Image width={24} height={24} src="/phone.svg" alt="phone icon" />
                <p className="text-slate-500 text-xl">{user.phone}</p>
              </div>
              <button
                className="px-6 py-2 bg-slate-200 rounded-xl mt-7 text-slate-600 font-medium hover:bg-slate-300 transition-all duration-100"
                onClick={() => router.push(`user/${user.id}`)}
              >Ver Perfil</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}
