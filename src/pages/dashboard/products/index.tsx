import apiClient from "@/lib/axios"
import { DashboardLayout } from "@/layout"
import { signIn, useSession } from "next-auth/react"
import { HiPencil, HiTrash } from "react-icons/hi"
import { useState, useEffect } from "react"
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

  useEffect(() => {
    const fetchProductsWithSeller = async () => {
      const productsWithSeller = await Promise.all(
        initialProducts.map(async (product: any) => {
          const seller = await apiClient.get(
            `${process.env.NEXT_PUBLIC_API_USERS_ENDPOINT}?id=${product.sellerId}`,
          )

          return {
            ...product,
            sellerName: seller?.data?.name,
          }
        }),
      )
      setDatas(productsWithSeller)
    }
    fetchProductsWithSeller()
  }, [initialProducts])

  const handleDeleteProduct = async (productId: number) => {
    setIsDeleting(true)
    try {
      await apiClient.delete(
        `${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}?id=${productId}`,
      )

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

  if (session) {
    return (
      <>
        <DashboardLayout>
          {session?.user?.role === "ADMIN" && (
            <div className="w-full h-full overflow-x-auto">
              <div className="w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold">Manajemen Produk</h1>
                <div className="shadow border-b border-gray-200 sm:rounded-lg mt-4">
                  <div className="overflow-x-auto overflow-y-auto h-[60vh]">
                    <table className="max-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Nama Produk
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Deskripsi Produk
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Harga
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            No. Telpon
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Penjual
                          </th>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {datas.map((data: any) => (
                          <tr key={data.id}>
                            <td className="px-2 py-4 whitespace-nowrap truncate">
                              {data.title}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap truncate">
                              {data.description}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap truncate">
                              {data.price}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap truncate">
                              {data.phoneNumber}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap truncate">
                              {data.sellerName}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap flex justify-center items-center gap-3">
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {session?.user?.role === "SELLER" && (
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
          {session?.user?.role === "USER" && (
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
