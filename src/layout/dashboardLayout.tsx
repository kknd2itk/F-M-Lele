import { DashboardMenu } from "@/components/dasboard/menu"

export const DashboardLayout = ({ children, session }: any) => {
  return (
    <div className="mx-16 px-4 flex flex-row gap-4 h-[82vh] w-screen">
      <div className="w-1/3">
        <DashboardMenu />
      </div>
      <div className="flex flex-col h-full w-2/3">{children}</div>
    </div>
  )
}
