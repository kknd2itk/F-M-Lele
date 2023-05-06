import apiClient from "@/lib/axios"
import { DashboardLayout } from "@/layout"
import { useSession, signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineWhatsApp } from "react-icons/ai"

export default function Profile() {
  const { data: session } = useSession()

  if (session) {
    return (
      <DashboardLayout>
        <section className="h-full w-full space-y-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex justify-start items-center gap-10">
            <div className="w-24 h-24">
              <Image
                src={session?.user?.image || ""}
                width={1000}
                height={1000}
                alt="profile-picture"
                className="rounded-full w-full h-full"
              />
            </div>
            <h1 className="text-lg font-medium">{session?.user?.name || ""}</h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <label>Name</label>
            <input
              className="border p-2 rounded-md w-1/3"
              value={session?.user?.name || ""}
              disabled
            ></input>
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <label>Email</label>
            <input
              className="border p-2 rounded-md w-1/3"
              value={session?.user?.email || ""}
              disabled
            ></input>
          </div>
          {session?.user?.role === "USERS" && (
            <div className="flex flex-col justify-center items-start gap-2">
              <label>Ingin menjadi Penjual? Klik tombol dibawah ini</label>
              <Link
                href={`https://wa.me/6281251810907?text=Halo%20pak/bu,%20saya%20tertarik%20untuk%20menjadi%20Penjual.%20apa%20saja%20yang%20harus%20saya%20siapkan%20`}
                className="text-white border border-green-500 bg-green-500 w-1/3 flex justify-center items-center gap-3 py-3 rounded-md hover:text-green-500 hover:bg-white transition delay-0 ease-in-out"
              >
                <AiOutlineWhatsApp />
                Whatsapp
              </Link>
            </div>
          )}
        </section>
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
