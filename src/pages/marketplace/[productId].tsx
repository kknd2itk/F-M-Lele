import Link from "next/link"
import { GetServerSideProps } from "next"
import apiClient from "@/lib/axios"
import { supabase } from "@/lib/supabase"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { BiChevronLeft } from "react-icons/bi"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.params?.productId as string

  const { data: productData } = await apiClient.get(
    `${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}?id=${productId}` || "",
  )

  const userData = await prisma.user.findUnique({
    where: { id: productData.sellerId },
  })

  return {
    props: {
      product: productData,
      user: userData,
    },
  }
}

export default function ProductDetail({ product, user }: any) {
  const { data: imageUrl } = supabase.storage
    .from("fishindo-bucket")
    .getPublicUrl(product.imagePath)

  const displayPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.price)

  return (
    <div className="h-[82vh] overflow-y-auto lg:mx-16 px-4 flex flex-col justify-items-center gap-2 md:gap-8 lg:gap-10">
      <div className="flex justify-between items-center">
        <Link href={"/marketplace"} className="flex flex-row items-center">
          <BiChevronLeft className="scale-150" />
          Go Back
        </Link>
        <h3 className="font-light">{product.title}</h3>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center h-full px-12 gap-6 overflow-y-auto">
        <section className="lg:basis-1/3 pt-60 lg:pt-0 w-full h-full ">
          <div className="w-full h-full lg:h-2/3">
            <Image
              src={imageUrl.publicUrl}
              alt={product.title}
              className="w-full h-full object-cover drop-shadow-md"
              width={1000}
              height={1000}
            />
          </div>
        </section>
        <section className="lg:basis-1/3 w-full h-full space-y-3">
          <h1 className="text-3xl font-bold">Detail Produk</h1>
          <div className="p-3 bg-slate-50 drop-shadow-sm space-y-1 rounded-md">
            <h2 className="font-medium text-lg">{product.title}</h2>
            <h1 className="font-black text-3xl">Rp.{displayPrice}/kg</h1>
          </div>
          <div className="p-3 bg-slate-50 drop-shadow-sm space-y-1 rounded-md">
            <h2 className="font-bold text-lg">Deskripsi Produk</h2>
            <p>{product.description}</p>
          </div>
          <div className="p-3 bg-slate-50 drop-shadow-sm space-y-1 rounded-md">
            <h2 className="font-bold text-lg">Penjual</h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </section>
        <section className="lg:basis-1/3 w-full h-full pb-20">
          <Link
            href={`https://wa.me/62${product.phoneNumber}?text=Halo pak/bu,%20saya%20tertarik%20untuk%20membeli%20${product.title}%20`}
            className="text-white border border-green-500 bg-green-500 flex justify-center items-center gap-3 py-3 rounded-md hover:text-green-500 hover:bg-white transition delay-0 ease-in-out"
          >
            <AiOutlineWhatsApp />
            Whatsapp
          </Link>
        </section>
      </div>
    </div>
  )
}
