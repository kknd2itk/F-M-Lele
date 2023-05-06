import apiClient from "@/lib/axios"
import { DashboardLayout } from "@/layout"
import { signIn, useSession } from "next-auth/react"
import { HiPencil, HiTrash } from "react-icons/hi"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { notify } from "@/components/toast"
import { useRouter } from "next/router"
import Link from "next/link"

export async function getServerSideProps() {
  // Fetch data from the API
  const { data } = await apiClient.get(
    process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT || "",
  )
  // Pass the data to the page as props
  return {
    props: {
      products: data,
    },
  }
}

export default function UserManagement({ products: initialProducts }: any) {
  const { data: session } = useSession()
  const [datas, setDatas] = useState(initialProducts)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteProduct = async (productId: number) => {
    setIsDeleting(true)
    try {
      await deleteProduct(productId)
      setDatas((prevProducts: any) =>
        prevProducts.filter((product: any) => product.id !== productId),
      )
      notify({
        title: "Berhasil",
        message: "Data berhasil dihapus",
      })
    } catch (error) {
      console.error(error)
      notify({
        title: "Gagal",
        message: "Data gagal dihapus",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const deleteProduct = async (productId: number) => {
    await apiClient.delete(
      `${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}?id=${productId}`,
    )
  }

  if (session) {
    return (
      <>
        <DashboardLayout>
          {session && session?.user?.role === "ADMIN" && (
            <div className="w-full h-full overflow-y-auto space-y-4">
              <h1 className="text-2xl font-bold">Manajemen Produk</h1>
              <table className="w-full table-fixed">
                <thead className="border">
                  <tr className="border">
                    <th className="border w-1/6 p-2">Nama Produk</th>
                    <th className="border w-1/6 p-2">Deskripsi Produk</th>
                    <th className="border w-1/6 p-2">Harga</th>
                    <th className="border w-1/6 p-2">No. Telpon</th>
                    <th className="border w-1/6 p-2">Penjual</th>
                    <th className="border w-1/6 p-2">Action</th>
                  </tr>
                </thead>
                <tbody className="font-regular">
                  {datas.map((data: any) => {
                    return (
                      <tr key={data.id} className="font-regular">
                        <td className="border truncate p-2">{data.title}</td>
                        <td className="border truncate p-2">
                          {data.description}
                        </td>
                        <td className="border truncate p-2">{data.price}</td>
                        <td className="border truncate p-2">
                          {data.phoneNumber}
                        </td>
                        <td className="border truncate p-2">{data.sellerId}</td>
                        <td className="border truncate p-2 flex justify-center items-center gap-3">
                          <button className="text-white bg-yellow-500 rounded-md p-2 hover:text-yellow-500 hover:bg-white transition delay-0 ease-out">
                            <HiPencil />
                          </button>
                          <button
                            className="text-white bg-red-500 rounded-md p-2 hover:text-red-500 hover:bg-white transition delay-0 ease-out"
                            onClick={() => handleDeleteProduct(data.id)}
                          >
                            <HiTrash />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          {session && session?.user?.role === "SELLER" && (
            <div className="w-full h-full overflow-y-auto space-y-4">
              <h1 className="text-2xl font-bold">Manajemen Produk</h1>
              <table className="w-full table-fixed">
                <thead className="border">
                  <tr className="border">
                    <th className="border w-1/6 p-2">Nama Produk</th>
                    <th className="border w-1/6 p-2">Deskripsi Produk</th>
                    <th className="border w-1/6 p-2">Harga</th>
                    <th className="border w-1/6 p-2">No. Telpon</th>
                    <th className="border w-1/6 p-2">Action</th>
                  </tr>
                </thead>
                <tbody className="font-regular">
                  {datas
                    .filter((data: any) => data.sellerId === session?.user?.id)
                    .map((data: any) => {
                      return (
                        <tr key={data.id} className="font-regular">
                          <td className="border truncate p-2">{data.title}</td>
                          <td className="border truncate p-2">
                            {data.description}
                          </td>
                          <td className="border truncate p-2">{data.price}</td>
                          <td className="border truncate p-2">
                            {data.phoneNumber}
                          </td>
                          <td className="border truncate p-2 flex justify-center items-center gap-3">
                            <button className="text-white bg-yellow-500 rounded-md p-2 hover:text-yellow-500 hover:bg-white transition delay-0 ease-out">
                              <HiPencil />
                            </button>
                            <button
                              className="text-white bg-red-500 rounded-md p-2 hover:text-red-500 hover:bg-white transition delay-0 ease-out"
                              onClick={() => handleDeleteProduct(data.id)}
                            >
                              <HiTrash />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
          {session && session?.user?.role === "USER" && (
            <div className="px-4 h-[82vh] flex flex-col justify-center items-center gap-4 text-center">
              <h1 className="text-xl font-semibold">
                Anda tidak memiliki akses. Kembali ke Dashboard
              </h1>
              <Link
                className="border bg-cyan-500 text-white w-max px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
                href={"/dashboard"}
              >
                Dashboard
              </Link>
            </div>
          )}
        </DashboardLayout>
        <Toaster />
      </>
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
