import Link from "next/link"
import { signOut } from "next-auth/react"

export const DashboardMenu = () => {
  return (
    <div className="flex flex-col h-2/3 p-6 shadow-md rounded-md gap-3">
      <Link
        href={"/dashboard/product"}
        className="p-3 hover:bg-cyan-500 hover:text-white rounded-md"
      >
        Product Management
      </Link>
      <Link
        href={"/dashboard/user"}
        className="p-3 hover:bg-cyan-500 hover:text-white rounded-md"
      >
        User Management
      </Link>
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
