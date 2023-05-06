import { useState, useEffect } from "react"
import apiClient from "@/lib/axios"
import { DashboardLayout } from "@/layout"
import { useSession } from "next-auth/react"
import { HiPencil, HiTrash } from "react-icons/hi"
import { MdSell } from "react-icons/md"

export async function getServerSideProps() {
  // Fetch data from the API
  const { data } = await apiClient.get(
    process.env.NEXT_PUBLIC_API_USERS_ENDPOINT || "",
  )

  // Pass the data to the page as props
  return {
    props: {
      users: data,
    },
  }
}

export default function UserManagement({ users }: any) {
  const { data: session } = useSession()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await apiClient.get(
        process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT || "",
      )
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const getProductCount = (sellerId: string) => {
    return products.filter((product: any) => product.sellerId === sellerId)
      .length
  }

  return (
    <DashboardLayout>
      {session && session?.user?.role === "ADMIN" && (
        <div className="w-full h-full space-y-4">
          <h1 className="text-2xl font-bold">Manajemen User</h1>
          <div className="h-full overflow-y-auto">
            <table className="w-full table-fixed">
              <thead className="border">
                <tr className="border">
                  <th className="border w-1/5 p-2">Email</th>
                  <th className="border w-1/5 p-2">Nama</th>
                  <th className="border w-1/5 p-2">Role</th>
                  <th className="border w-1/5 p-2">Product</th>
                  <th className="border w-1/5 p-2">Action</th>
                </tr>
              </thead>
              <tbody className="font-regular">
                {users.map((user: any) => {
                  return (
                    <tr key={user.id} className="font-regular">
                      <td className="border truncate p-2">{user.email}</td>
                      <td className="border truncate p-2">{user.name}</td>
                      <td className="border truncate p-2">{user.role}</td>
                      <td className="border truncate p-2 text-center">
                        {getProductCount(user.id)}
                      </td>
                      <td className="border truncate p-2 flex justify-center items-center gap-3">
                        <button className="text-white bg-green-500 rounded-md p-2 hover:text-green-500 hover:bg-white transition delay-0 ease-out">
                          <MdSell />
                        </button>
                        <button className="text-white bg-yellow-500 rounded-md p-2 hover:text-yellow-500 hover:bg-white transition delay-0 ease-out">
                          <HiPencil />
                        </button>
                        <button className="text-white bg-red-500 rounded-md p-2 hover:text-red-500 hover:bg-white transition delay-0 ease-out">
                          <HiTrash />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!session && <div>Anda tidak memiliki akses kesini</div>}
    </DashboardLayout>
  )
}
