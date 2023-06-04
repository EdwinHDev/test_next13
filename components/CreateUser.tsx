"use client"

import { IUser } from "@/interfaces/User";
import { idGenerate } from "@/utils/idGenerate";
import { ChangeEvent, FormEvent, useState } from "react";

export const CreateUser = () => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<IUser>({
    id: idGenerate(),
    firstName: "",
    lastName: "",
    avatar: "",
    phone: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data!,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(false);
    setError(false);
    setSuccess(false);
    setMessage("");

    let _error = false;

    if (data.firstName === "") {
      _error = true;
    }

    if (data.lastName === "") {
      _error = true;
    }

    if (data.avatar === "") {
      _error = true;
    }

    if (data.phone === "") {
      _error = true;
    }

    if(_error) {
      setError(true);
      setMessage("Todos los campos son obligatorios");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 3000);
      return;
    }

    const user: IUser = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
      phone: data.phone
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/create", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(user)
      });
      const data = await res.json();
      
      if(res.status === 200) {
        setLoading(false);
        setSuccess(true);
        setMessage(data);
        setTimeout(() => {
          setSuccess(false);
          setMessage("");
        }, 3000);
      }

      if(res.status === 401) {
        setLoading(false);
        setError(true);
        setMessage(data);
        setTimeout(() => {
          setError(false);
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage("Algo salio mal...");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 3000);
      return;
    }
  }

  return (
    <form
      className="border border-slate-300 p-10 rounded-lg bg-white max-w-sm mt-10 flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <label
          htmlFor="first-name"
          className="block text-slate-500"
        >Primer nombre</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          onChange={handleChange}
          placeholder="Primer nombre"
          className="border border-slate-200 rounded-lg px-3 py-2 outline-slate-600"
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="last-name"
          className="block text-slate-500"
        >Segundo nombre</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          onChange={handleChange}
          placeholder="Segundo nombre"
          className="border border-slate-200 rounded-lg px-3 py-2 outline-slate-600"
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="avatar"
          className="block text-slate-500"
        >Link de tu avatar</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          onChange={handleChange}
          placeholder="Url de avatar"
          className="border border-slate-200 rounded-lg px-3 py-2 outline-slate-600"
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="phone"
          className="block text-slate-500"
        >Número de teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={handleChange}
          placeholder="Número de teléfono"
          className="border border-slate-200 rounded-lg px-3 py-2 outline-slate-600"
        />
      </div>
      {
        loading && (
          <div className="w-full p-1 flex justify-center">
            <p className="text-slate-500 text-center text-sm">Cargando...</p>
          </div>
        )
      }
      {
        error && (
          <div className="w-full p-1 flex justify-center">
            <p className="text-red-700 text-center text-sm">{message}</p>
          </div>
        )
      }
      {
        success && (
          <div className="w-full p-1 flex justify-center">
            <p className="text-green-600 text-center text-sm">{message}</p>
          </div>
        )
      }
      <button
        type="submit"
        className="px-4 py-3 bg-indigo-500 text-white font-medium text-xl uppercase rounded hover:bg-indigo-600"
      >Crear usuario</button>
    </form>
  )
}
