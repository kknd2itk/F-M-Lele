import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Marketplace() {
  const { data: session } = useSession()
  if (session) {
    return (
      <section className="mx-12 px-6 flex flex-row justify-center items-center h-[82vh]">
        {session ? (
          <div className="my-6 space-x-4">
            <Link
              className="border bg-cyan-500 text-white w-1/3 px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
              href={"/marketplace/add-product"}
            >
              Tambah Produk
            </Link>
            <Link
              className="border bg-cyan-500 text-white w-1/3 px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
              href={"/forum"}
            >
              Marketplace
            </Link>
            <Link
              className="border bg-cyan-500 text-white w-1/3 px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
              href={"/forum"}
            >
              Forum
            </Link>
          </div>
        ) : (
          <button
            className="border bg-cyan-500 text-white w-1/3 px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
            onClick={() => {
              signIn()
            }}
          >
            Gabung Sekarang
          </button>
        )}
      </section>
    )
  }
  return <div>Tidak login</div>
}
