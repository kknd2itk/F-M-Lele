import { Navbar, Footer } from "@/components"

export const RootLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
