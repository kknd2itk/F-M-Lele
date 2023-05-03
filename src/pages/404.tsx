import Image from "next/image"
import Link from "next/link"
import ucIllustration from "../../public/img/uc-illustration.webp"

export default function Custom404() {
  return (
    <section className="h-[82vh] flex justify-center items-center flex-row">
      <div className="hidden w-1/2 lg:flex justify-end">
        <Image src={ucIllustration} alt="Under Construction Illustration" />
      </div>
      <div className="w-1/2 space-y-1">
        <h1 className="text-2xl lg:text-8xl font-black text-cyan-900">
          Website
        </h1>
        <h2 className="text-lg lg:text-4xl font-medium">
          tidak ditemukan atau sedang dalam konstruksi
        </h2>
        <Link
          className="flex text-xs lg:text-md w-max justify-center items-center border bg-cyan-500 text-white px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
          href={"/"}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  )
}
