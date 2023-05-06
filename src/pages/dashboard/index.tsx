import { DashboardLayout } from "@/layout/dashboardLayout"
import { signIn, useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()

  if (session) {
    return (
      <DashboardLayout>
        <section className="h-full w-full"></section>
      </DashboardLayout>
    )
  }

  return (
    <div className="px-4 h-[82vh] flex flex-col justify-center items-center gap-4 text-center">
      <h1 className="text-xl font-semibold">
        Anda tidak memiliki akses. Silahkan login terlebih dahulu
      </h1>
      <button
        className="border bg-cyan-500 text-white w-max px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
        onClick={() => {
          signIn()
        }}
      >
        Gabung Sekarang
      </button>
    </div>
  )
}
