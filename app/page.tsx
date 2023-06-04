import { CreateUser } from "@/components/CreateUser";

export default function Home() {
  return (
    <main
      className="p-16 w-full h-screen"
    >
      <div
        className="w-full h-full border border-slate-300 p-10 rounded-lg bg-white flex flex-col items-center"
      >
        <h1 className="text-center text-slate-600 text-2xl font-bold">Creación de usuarios</h1>

        <CreateUser />
      </div>
    </main>
  )
}
