import Link from "next/link"

export const Nav = () => {
  return (
    <div
      className="w-full bg-slate-100 px-16 py-6 border-b border-slate-200"
    >
      <ul className="flex gap-8">
        <li><Link href="/" className="px-6 py-3 bg-slate-200 bg-opacity-50 rounded-xl text-slate-600 font-medium hover:bg-opacity-100">Inicio</Link></li>
        <li><Link href="/user" className="px-6 py-3 bg-slate-200 bg-opacity-50 rounded-xl text-slate-600 font-medium hover:bg-opacity-100">Usuarios</Link></li>
      </ul>
    </div>
  )
}
