import { DashboardMenu } from "@/components/dasboard/menu"

export const DashboardLayout = ({ children }: any) => {
  return (
    <div className="px-4 lg:px-16 flex flex-col lg:flex-row lg:gap-4 h-[82vh] w-screen">
      <div className="lg:w-1/3 mb-4 lg:mb-0">
        <DashboardMenu />
      </div>
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  )
}
