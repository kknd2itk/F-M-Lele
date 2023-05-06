import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export const DashboardMenu = () => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col h-2/3 p-6 shadow-md rounded-md gap-3 w-max">
      <Link
        href={"/dashboard"}
        className="p-3 hover:bg-cyan-500 hover:text-white rounded-md"
      >
        Dashboard
      </Link>
      {session?.user?.role === "SELLER" && (
        <Link
          href={"/dashboard/products"}
          className="p-3 hover:bg-cyan-500 hover:text-white rounded-md"
        >
          Product Management
        </Link>
      )}
      {session?.user?.role === "ADMIN" && (
        <Link
          href={"/dashboard/products"}
          className="p-3 hover:bg-cyan-500 hover:text-white rounded-md"
        >
          Product Management
        </Link>
      )}
      {session?.user?.role === "ADMIN" && (
        <Link
          href={"/dashboard/users"}
          className="p-3 hover:bg-cyan-500 hover:text-white rounded-md"
        >
          User Management
        </Link>
      )}
      <Link
        href={"/dashboard/profile"}
        className="p-3 hover:bg-cyan-500 hover:text-white rounded-md"
      >
        Profile
      </Link>
      <button
        className="bg-red-500 w-full text-white p-3 rounded-lg font-medium border border-red-500 hover:bg-white hover:text-red-500"
        onClick={() => {
          signOut()
        }}
      >
        Sign Out
      </button>
    </div>
  )
}
