import apiClient from "@/lib/axios"
import { DashboardLayout } from "@/layout"

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

export default function Profile({ users }: any) {
  console.log(users)

  return (
    <DashboardLayout>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nama</th>
            <th>Role</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => {
            return (
              <tr key={user.id}>
                <th>{user.email}</th>
                <th>{user.name}</th>
                <th>{user.role}</th>
                <th>{user.email}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </DashboardLayout>
  )
}
