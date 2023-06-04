
import { Suspense } from "react";
import { Users } from "@/components/Users";

export default async function UserPage() {

  return (
    <div
      className="p-16 w-full"
    >
      <Suspense fallback={<p className="text-slate-600 font-medium">Cargando usuarios...</p>}>
        <Users />
      </Suspense>
    </div>
  )
}
