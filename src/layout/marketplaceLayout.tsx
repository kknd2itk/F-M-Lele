import { FilterBox } from "@/components"
import Link from "next/link"

export const MarketplaceLayout = ({
  searchValue,
  setSearchValue,
  session,
  children,
}: any) => {
  return (
    <div className="mx-16 px-4 flex flex-row gap-4 h-[82vh]">
      <div className="w-1/4">
        <FilterBox />
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex w-1/2 flex-row gap-2">
          <input
            onChange={setSearchValue}
            className="px-6 py-3 border w-full rounded-md"
            placeholder="Cari produk"
          />
          {session?.user?.role === "SELLER" ||
            (session?.user?.role === "ADMIN" && (
              <Link
                href={"/marketplace/add-product"}
                className="border bg-cyan-500 text-white w-max px-6 py-3 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in hover:bg-white text-center"
              >
                Tambah Produk
              </Link>
            ))}
        </div>
        <div className="overflow-y-auto max-h-full">{children}</div>
      </div>
    </div>
  )
}
