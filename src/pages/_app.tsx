import { SessionProvider } from "next-auth/react"

import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Poppins } from "next/font/google"

import { RootLayout } from "@/layout"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Fishindo</title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  )
}
