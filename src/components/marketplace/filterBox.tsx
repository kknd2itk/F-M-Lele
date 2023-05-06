import React from "react"
import Link from "next/link"
import Image from "next/image"

export const FilterBox = () => {
  return (
    <div className="flex flex-col w-full bg-cyan-50 p-6 rounded-lg drop-shadow-md h-3/4">
      <h1 className="font-bold text-2xl">Filter</h1>
      <p className="text-center my-12">Tidak ada filter</p>
    </div>
  )
}
