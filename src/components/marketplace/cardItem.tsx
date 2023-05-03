import React from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

export const CardItem = ({ item }: any) => {
  const { data: imageUrl } = supabase.storage
    .from("fishindo-bucket")
    .getPublicUrl(item.imagePath)

  const displayPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(item.price)

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 drop-shadow-sm w-full border rounded-md">
      <div className="w-full h-32">
        <Image
          src={imageUrl.publicUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
        />
      </div>
      <div className="px-6 py-3 flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <h5 className="font-medium">{item.title}</h5>
            <p className="font-light truncate ">{item.description}</p>
          </div>
          <div className="flex justify-center items-center w-full">
            <p className="font-bold text-end text-sm">{displayPrice}/kg</p>
          </div>
        </div>
        <Link
          href={`/marketplace/${item.id}`}
          className="border bg-cyan-500 text-white w-max px-3 py-1 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 hover:bg-white transition delay-0 ease-in"
        >
          Lihat Produk
        </Link>
      </div>
    </div>
  )
}
