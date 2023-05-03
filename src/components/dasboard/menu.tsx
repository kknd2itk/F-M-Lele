import Link from "next/link"
import { signOut } from "next-auth/react"

export const DashboardMenu = () => {
  return (
    <div>
      <Link href={"/dashboard/product"}></Link>
      <Link href={"/dashboard/user"}></Link>
      <Link href={"/dashboard/profile"}></Link>
      <button
        className="bg-red-500 w-11/12 text-white p-3 rounded-lg font-medium border border-red-500 hover:bg-white hover:text-red-500"
        onClick={() => {
          signOut()
        }}
      >
        Sign Out
      </button>
    </div>
  )
}
