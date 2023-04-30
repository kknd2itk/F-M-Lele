import Image from "next/image"
import ucIllustration from "../../public/img/uc-illustration.webp"

export default function ForOhFor() {
  return (
    <section className="h-[82vh] flex justify-center items-center flex-row">
      <div className="w-1/2 flex justify-end">
        <Image src={ucIllustration} alt="Under Construction Illustration" />
      </div>
      <div className="w-1/2">
        <h1 className="text-8xl font-black text-cyan-900">Website</h1>
        <h2 className="text-4xl font-medium">sedang dalam konstruksi</h2>
      </div>
    </section>
  )
}
