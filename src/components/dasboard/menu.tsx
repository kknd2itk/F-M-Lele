import { useState } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { FiMenu } from "react-icons/fi"

export const DashboardMenu = () => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="block">
      {/* Hamburger menu */}
      <div
        className="lg:hidden flex justify-around drop-shadow-md px-2 py-4 bg-cyan-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div>Dashboard Menu</div>
        <FiMenu className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Sidebar menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        }  absolute z-10 right-0 lg:block lg:relative w-full lg:w-64 bg-white shadow-md py-6 px-4 sm:px-6 lg:px-8 space-y-4`}
      >
        <Link
          href={"/dashboard"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block p-3 hover:bg-cyan-500 hover:text-white rounded-md"
        >
          Dashboard
        </Link>
        {session?.user?.role === "SELLER" && (
          <Link
            href={"/dashboard/products"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block p-3 hover:bg-cyan-500 hover:text-white rounded-md"
          >
            Product Management
          </Link>
        )}
        {session?.user?.role === "ADMIN" && (
          <Link
            href={"/dashboard/products"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block p-3 hover:bg-cyan-500 hover:text-white rounded-md"
          >
            Product Management
          </Link>
        )}
        {session?.user?.role === "ADMIN" && (
          <Link
            href={"/dashboard/users"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block p-3 hover:bg-cyan-500 hover:text-white rounded-md"
          >
            User Management
          </Link>
        )}
        <Link
          href={"/dashboard/profile"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block p-3 hover:bg-cyan-500 hover:text-white rounded-md"
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
    </div>
  )
}
