import Image from "next/image"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import img1 from "/public/img/fish-illustration.jpg"

export default function Home() {
  const { data: session } = useSession()

  return (
    <section className="flex flex-col md:flex-row justify-center items-center h-[82vh]">
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <Image src={img1} alt="Illustrasi Pemancingan" />
      </div>
      <div className="w-full md:w-1/2 gap-1 md:gap-2 lg:gap-4 h-[85%] lg:h-[80%] flex flex-col justify-center px-16 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 text-gradient drop-shadow-md">
        <h1 className="text-2xl pt-5 md:pt-10 lg:pt-0 md:text-4xl lg:text-6xl font-black text-blue-800-to-blue-900 text-cyan-950">
          Fishindo
        </h1>
        <p className="text-xs sm:text-md md:text-lg lg:text-xl font-light">
          Selamat datang di Fishindo! Kami adalah sumber informasi terkini
          seputar dunia perikanan, dengan fokus pada pemeliharaan ikan,
          budidaya, dan perdagangan ikan. Kami menyediakan artikel-artikel
          informatif, tips praktis, serta berita terkini seputar industri
          perikanan.
        </p>
        {session ? (
          <div className="my-3 lg:my-6 space-x-2 lg:space-x-4 pb-5 md:pb-10">
            <Link
              className="border bg-cyan-500 text-xs md:text-sm lg:text-md p-2 lg:p-3 text-white w-max lg:px-8 lg:py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
              href={"/marketplace"}
            >
              Marketplace
            </Link>
            <Link
              className="border bg-cyan-500 text-xs md:text-sm lg:text-md p-2 lg:p-3 text-white w-max lg:px-8 lg:py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
              href={"/forum"}
            >
              Forum
            </Link>
          </div>
        ) : (
          <button
            className="border bg-cyan-500 text-white w-max text-sm lg:text-md p-3 lg:px-8 lg:py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
            onClick={() => {
              signIn()
            }}
          >
            Gabung Sekarang
          </button>
        )}
      </div>
    </section>
  )
}
