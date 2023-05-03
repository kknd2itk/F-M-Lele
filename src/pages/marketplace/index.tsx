import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { MarketplaceLayout } from "@/layout/marketplaceLayout"
import apiClient from "@/lib/axios"
import { CardItem } from "@/components"

export async function getServerSideProps() {
  // Fetch data from the API
  const { data } = await apiClient.get(
    process.env.NEXT_PUBLIC_API_PRODUCT_ENDPOINT || "",
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
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleSearchQueryChange = (e: any) => {
    setSearchQuery(e.target.value)
  }

  if (session) {
    return (
      <MarketplaceLayout searchValue={searchQuery} setSearchValue={searchQuery}>
        <section className="w-full grid grid-cols-3 gap-4 overflow-y-auto">
          {products.map((product: any) => {
            return <CardItem item={product} key={product.id} />
          })}
        </section>
      </MarketplaceLayout>
    )
  }
  return (
    <button
      className="border bg-cyan-500 text-white w-1/3 px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 transition delay-0 ease-in"
      onClick={() => {
        signIn()
      }}
    >
      Gabung Sekarang
    </button>
  )
}
