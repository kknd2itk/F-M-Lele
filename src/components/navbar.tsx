import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCrossCircled } from "react-icons/rx"

export const Navbar = () => {
  const router = useRouter()
  const [accountMenu, setAccountMenu] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between items-center md:mx-16 px-4 h-[10vh]">
      <Link href={"/"} className="font-black text-lg text-cyan-600">
        Fishindo
      </Link>
      <button
        className={`${sidebar ? "hidden" : "flex"} md:hidden`}
        onClick={() => {
          setSidebar(!sidebar)
        }}
      >
        <GiHamburgerMenu />
      </button>
      <div
        className={`${
          sidebar ? "flex" : "hidden"
        } md:flex md:flex-row gap-6 z-10`}
      >
        <ul className="absolute flex top-0 left-0 flex-col md:relative md:flex-row gap-6 items-center justify-center font-medium bg-white w-full h-full">
          <button
            className={`${sidebar ? "flex" : "hidden"} lg:hidden`}
            onClick={() => {
              setSidebar(!sidebar)
            }}
          >
            <RxCrossCircled className="scale-150" />
          </button>
          <Link
            href={"/"}
            onClick={() => {
              setSidebar(false)
            }}
            className="border-2 border-transparent hover:border-b-cyan-300 py-2"
          >
            Beranda
          </Link>
          <Link
            href={"/marketplace"}
            onClick={() => {
              setSidebar(false)
            }}
            className=" border-2 border-transparent hover:border-b-cyan-300 py-2"
          >
            Marketplace
          </Link>
          {/* <Link
            href={"/forum"}
            onClick={() => {
              setSidebar(false)
            }}
            className="border-2 border-transparent hover:border-b-cyan-300 py-2"
          >
            Forum
          </Link> */}
          {session ? (
            <li
              className="relative cursor-pointer "
              onClick={() => {
                setAccountMenu(!accountMenu)
              }}
            >
              <h3 className="border border-cyan-800 text-cyan-800 px-6 py-3 rounded-md font-medium hover:bg-gradient-to-br hover:text-white hover:bg-cyan-500 transition delay-0 ease-in">
                Hai, {session?.user?.name}
              </h3>
              <div
                className={
                  accountMenu
                    ? "flex flex-col border absolute w-full rounded-lg top-14 left-0 z-10 "
                    : "hidden"
                }
              >
                <ul className="bg-white text-[#222]">
                  <Link
                    href={"/dashboard"}
                    onClick={() => {
                      setSidebar(false)
                    }}
                    className="flex border border-transparent px-3 py-2 w-11/12 mx-3 my-2 hover:border-cyan-800 rounded-md"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={"/dashboard/profile"}
                    onClick={() => {
                      setSidebar(false)
                    }}
                    className="flex border border-transparent px-3 py-2 w-11/12 mx-3 my-2 hover:border-cyan-800 rounded-md"
                  >
                    My Profile
                  </Link>
                  <li className="flex justify-center items-center my-2">
                    <button
                      className="bg-red-500 w-11/12 text-white p-3 rounded-lg font-medium border border-red-500 hover:bg-white hover:text-red-500"
                      onClick={() => {
                        signOut()
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li>
              <button
                className="border border-cyan-800 text-cyan-800 px-6 py-3 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-white hover:bg-cyan-500 transition delay-0 ease-in"
                onClick={() => {
                  signIn()
                }}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
