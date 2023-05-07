import { useState, useEffect } from "react"
import apiClient from "@/lib/axios"
import { DashboardLayout } from "@/layout"
import { useSession } from "next-auth/react"
import { HiPencil, HiTrash } from "react-icons/hi"
import { MdSell } from "react-icons/md"
import { Toaster } from "react-hot-toast"
import { notify } from "@/components/toast"
import { signIn } from "next-auth/react"
import Link from "next/link"

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

export default function UserManagement({ users: initialUsers }: any) {
  const { data: session } = useSession()
  const [usersData, setUsersData] = useState(initialUsers)
  const [productsData, setProductsData] = useState([])
  const [role, setRole] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [editedUserIndex, setEditedUserIndex] = useState(-1)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await apiClient.get(
        process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT || "",
      )
      setProductsData(data)
    }
    fetchProducts()
  }, [])

  const getProductCount = (sellerId: string) => {
    return productsData.filter((product: any) => product.sellerId === sellerId)
      .length
  }

  const handleRoleChange = (e: any, userIndex: number) => {
    const newRole = e.target.value
    setUsersData((prevUsers: any) =>
      prevUsers.map((user: any, index: any) =>
        index === userIndex ? { ...user, role: newRole } : user,
      ),
    )
    setEditedUserIndex(userIndex)
    setRole(newRole)
  }

  const handleDeleteUser = async (userId: number) => {
    setIsDeleting(true)
    try {
      await deleteUser(userId)
      setUsersData((prevUsers: any) =>
        prevUsers.filter((user: any) => user.id !== userId),
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

  const deleteUser = async (userId: number) => {
    await apiClient.delete(
      `${process.env.NEXT_PUBLIC_API_USERS_ENDPOINT}?id=${userId}`,
    )
  }

  if (session) {
    return (
      <>
        <DashboardLayout>
          {session?.user?.role === "ADMIN" && (
            <div className="w-full h-full overflow-x-auto">
              <div className="w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold">Manajemen User</h1>
                <div className="shadow border-b border-gray-200 sm:rounded-lg mt-4">
                  <div className="overflow-x-auto overflow-y-auto h-[60vh]">
                    <table className="max-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                            Email
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                            Nama
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                            Role
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                            Product
                          </th>
                          <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {usersData
                          .filter((user: any) => user.role !== "ADMIN")
                          .map((user: any) => {
                            return (
                              <tr key={user.id}>
                                <td className="px-2 py-4 whitespace-nowrap truncate">
                                  {user.email}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap truncate">
                                  {user.name}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap truncate">
                                  {getProductCount(user.id)}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap truncate flex gap-2">
                                  <select
                                    value={user.role}
                                    onChange={(e) =>
                                      handleRoleChange(
                                        e,
                                        usersData.indexOf(user),
                                      )
                                    }
                                    className="bg-white border border-gray-300 p-2 rounded-md flex-grow"
                                  >
                                    <option value="USER">User</option>
                                    <option value="SELLER">Seller</option>
                                  </select>
                                  <button
                                    className="text-white bg-green-500 rounded-md p-2 hover:text-green-500 hover:bg-white transition delay-0 ease-out"
                                    onClick={async () => {
                                      try {
                                        const updatedUser = await apiClient.put(
                                          `${process.env.NEXT_PUBLIC_API_USERS_ENDPOINT}?id=${user.id}`,
                                          { role: role },
                                        )
                                        setUsersData((prevUsers: any) =>
                                          prevUsers.map((u: any) =>
                                            u.id === updatedUser.data.id
                                              ? updatedUser.data
                                              : u,
                                          ),
                                        )
                                        notify({
                                          title: "Berhasil",
                                          message: "Data berhasil diperbaharui",
                                        })
                                      } catch (error) {
                                        console.error(error)
                                        notify({
                                          title: "Gagal",
                                          message: "Data gagal dihapus",
                                        })
                                      } finally {
                                        setRole("")
                                      }
                                    }}
                                  >
                                    <MdSell />
                                  </button>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap truncate text-center space-x-2">
                                  <button
                                    className="text-white bg-red-500 rounded-md p-2 hover:text-red-500 hover:bg-white transition delay-0 ease-out"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <HiTrash />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        {usersData.length === 1 && (
                          <tr className="font-regular">
                            <td colSpan={5} className="p-4 text-center">
                              No users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {session?.user?.role !== "ADMIN" && (
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
