import { FilterBox } from "@/components"

export const MarketplaceLayout = ({
  searchValue,
  setSearchValue,
  children,
}: any) => {
  return (
    <div className="mx-16 px-4 flex flex-row gap-4 h-[82vh]">
      <div className="w-1/4">
        <FilterBox />
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <input
          onChange={setSearchValue}
          className="px-6 py-3 border w-1/2 rounded-md"
          placeholder="Cari produk"
        />
        <div className="overflow-y-auto max-h-full">{children}</div>
      </div>
    </div>
  )
}
