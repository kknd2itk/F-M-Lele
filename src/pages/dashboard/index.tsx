import { DashboardLayout } from "@/layout/dashboardLayout"
import { useSession } from "next-auth/react"

export default function Dashboard() {
  // const { data: session } = useSession

  return (
    <DashboardLayout>
      <section className="h-full"></section>
    </DashboardLayout>
  )
}
