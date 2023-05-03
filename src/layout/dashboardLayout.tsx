export const DashboardLayout = ({ children }: any) => {
  return (
    <div className="mx-16 px-4 flex flex-row gap-4 h-[82vh]">
      <div className="w-1/4">Menu</div>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="overflow-y-auto max-h-full">{children}</div>
      </div>
    </div>
  )
}
