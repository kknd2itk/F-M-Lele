import { useState, useEffect } from "react"
import { DashboardLayout } from "@/layout/dashboardLayout"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { MdProductionQuantityLimits } from "react-icons/md"
import {
  AiOutlineUser,
  AiOutlinePlusCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai"
import apiClient from "@/lib/axios"

export default function Dashboard() {
  const { data: session } = useSession()
  const [productsCount, setProductsCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.role === "SELLER") {
        const productsResponse = await apiClient.get(
          `${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}`,
        )
        const products = productsResponse.data
        const sellerProducts = products.filter((product: any) => {
          return product.sellerId === session.user.id
        })
        setProductsCount(sellerProducts.length)
      } else {
        const productsResponse = await apiClient.get(
          process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT || "",
        )
        setProductsCount(productsResponse.data.length)
      }
      const usersResponse = await apiClient.get(
        process.env.NEXT_PUBLIC_API_USERS_ENDPOINT || "",
      )
      setUsersCount(usersResponse.data.length)
    }

    fetchData()
  }, [session])

  if (session) {
    return (
      <DashboardLayout>
        <section className="h-full w-full px-4 md:px-8 lg:px-16 space-y-4">
          {session?.user?.role === "ADMIN" && (
            <>
              <h1 className="text-2xl font-bold">
                Halo, {session?.user?.name}
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Infographics</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  <div className="w-full h-28 lg:h-48 xl:h-72 flex justify-center items-center bg-orange-400 rounded-lg flex-col text-white">
                    <MdProductionQuantityLimits className="w-1/3 h-1/3" />
                    <p className="font-black text-md xl:text-6xl">
                      {productsCount}
                    </p>
                    <div className="text-sm xl:text-lg font-medium">
                      Total Produk
                    </div>
                  </div>
                  <div className="w-full h-28 lg:h-48 xl:h-72 flex justify-center items-center bg-blue-400 rounded-lg flex-col text-white">
                    <AiOutlineUser className="w-1/3 h-1/3" />
                    <div className="font-black text-md xl:text-6xl">
                      {usersCount}
                    </div>
                    <div className="text-sm xl:text-lg font-medium">
                      Total User
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Quick Action</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link
                    href={"/marketplace/add-product"}
                    className="w-full h-28 lg:h-34 xl:h-56 flex justify-center items-center bg-slate-400 rounded-lg flex-col text-white text-sm xl:text-lg font-medium"
                  >
                    <AiOutlinePlusCircle className="w-1/3 h-1/3" />
                    Tambah Produk
                  </Link>
                  <Link
                    href={"/dashboard/products"}
                    className="w-full h-28 lg:h-34 xl:h-56 flex justify-center items-center bg-stone-400 rounded-lg flex-col text-white text-sm xl:text-lg font-medium"
                  >
                    <AiOutlineUnorderedList className="w-1/3 h-1/3" />
                    Daftar Produk
                  </Link>
                  <Link
                    href={"/dashboard/users"}
                    className="w-full h-28 lg:h-34 xl:h-56 flex justify-center items-center bg-cyan-400 rounded-lg flex-col text-white text-sm xl:text-lg font-medium"
                  >
                    <AiOutlineUnorderedList className="w-1/3 h-1/3" />
                    Daftar User
                  </Link>
                </div>
              </div>
            </>
          )}
          {session?.user?.role === "SELLER" && (
            <>
              <h1 className="text-2xl font-bold">
                Halo, {session?.user?.name}
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Infographics</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  <div className="w-full h-28 lg:h-48 xl:h-72 flex justify-center items-center bg-orange-400 rounded-lg flex-col text-white">
                    <MdProductionQuantityLimits className="w-1/3 h-1/3" />
                    <p className="font-black text-md xl:text-6xl">
                      {productsCount}
                    </p>
                    <div className="text-sm xl:text-lg font-medium">
                      Total Produk
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Quick Action</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link
                    href={"/marketplace/add-product"}
                    className="w-full h-28 lg:h-34 xl:h-56 flex justify-center items-center bg-slate-400 rounded-lg flex-col text-white text-sm xl:text-lg font-medium"
                  >
                    <AiOutlinePlusCircle className="w-1/3 h-1/3" />
                    Tambah Produk
                  </Link>
                  <Link
                    href={"/dashboard/products"}
                    className="w-full h-28 lg:h-34 xl:h-56 flex justify-center items-center bg-stone-400 rounded-lg flex-col text-white text-sm xl:text-lg font-medium"
                  >
                    <AiOutlineUnorderedList className="w-1/3 h-1/3" />
                    Daftar Produk
                  </Link>
                </div>
              </div>
            </>
          )}
          {session?.user?.role === "USER" && (
            <>
              <h1 className="text-2xl font-bold">
                Halo, {session?.user?.name}
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Quick Action</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  <Link
                    className="w-full h-28 lg:h-48 xl:h-72 flex justify-center items-center bg-orange-400 rounded-lg flex-col text-white"
                    href={"/dashboard/profile"}
                  >
                    <MdProductionQuantityLimits className="w-1/3 h-1/3" />
                    Profilku
                  </Link>
                  <Link
                    className="w-full h-28 lg:h-48 xl:h-72 flex justify-center items-center bg-blue-400 rounded-lg flex-col text-white"
                    href={`https://wa.me/6281251810907?text=Halo%20pak/bu,%20saya%20tertarik%20untuk%20menjadi%20Penjual.%20apa%20saja%20yang%20harus%20saya%20siapkan%20`}
                  >
                    <MdProductionQuantityLimits className="w-1/3 h-1/3" />
                    Whatsapp
                  </Link>
                </div>
              </div>
            </>
          )}
        </section>
      </DashboardLayout>
    )
  }

  return (
    <div className="px-4 h-[82vh] flex flex-col justify-center items-center gap-4 text-center">
      <h1 className="text-xl font-semibold">
        Anda tidak memiliki akses. Silahkan login terlebih dahulu
      </h1>
      <button
        className="border bg-cyan-500 text-white w-max px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
        onClick={() => {
          signIn()
        }}
      >
        Gabung Sekarang
      </button>
    </div>
  )
}
