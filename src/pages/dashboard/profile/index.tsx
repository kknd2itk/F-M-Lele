import apiClient from "@/lib/axios"
import { DashboardLayout } from "@/layout"
import { useSession, signIn } from "next-auth/react"

export async function getServerSideProps() {
  // Fetch data from the API
  const { data } = await apiClient.get(
    process.env.NEXT_PUBLIC_API_USERS_ENDPOINT || "",
  )

  // Pass the data to the page as props
  return {
    props: {
      users: data,
    },
  }
}

export default function Profile({ users }: any) {
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
