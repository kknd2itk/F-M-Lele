import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { MarketplaceLayout } from "@/layout/marketplaceLayout"
import apiClient from "@/lib/axios"
import { CardItem } from "@/components"

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

export default function Marketplace({ products }: any) {
  const { data: session } = useSession()

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleQueryChange = (e: any) => {
    const newQuery = e.target.value
    setSearchQuery(newQuery)

    const filteredData = products.filter((product: any) =>
      product.title.toLowerCase().includes(newQuery.toLowerCase()),
    )
    setFilteredProducts(filteredData)
  }

  if (session) {
    return (
      <MarketplaceLayout
        searchQuery={searchQuery}
        session={session}
        filteredProducts={filteredProducts}
        handleQueryChange={handleQueryChange}
      >
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {filteredProducts.map((product: any) => {
            return <CardItem item={product} key={product.id} />
          })}
        </section>
      </MarketplaceLayout>
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
