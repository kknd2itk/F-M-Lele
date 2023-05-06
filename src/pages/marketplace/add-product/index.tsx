import Image from "next/image"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import { HiOutlineUpload } from "react-icons/hi"
import { BiChevronLeft } from "react-icons/bi"
import apiClient from "@/lib/axios"
import { Toaster } from "react-hot-toast"
import { notify } from "@/components/toast"
import Link from "next/link"

export default function AddProductPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [title, setTitle] = useState<any>()
  const [description, setDescription] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [phoneNumber, setPhoneNumber] = useState<any>()
  const [selectedImage, setSelectedImage] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleFileChange = (e: any) => {
    setSelectedImage(e.target.files[0])
  }

  const handleCreateProduct = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    notify({ title: "Proses", message: "Sedang memproses data" })

    try {
      const { data, error } = await supabase.storage
        .from("fishindo-bucket")
        .upload("products/" + session?.user?.id + "/" + uuidv4(), selectedImage)
      if (error) {
        setIsSubmitting(false)
        setErrorMessage(error)
        console.error(error)
      }

      await apiClient
        .post(`${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}` || "", {
          title: title,
          description: description,
          price: parseInt(price),
          phoneNumber: phoneNumber,
          imagePath: data?.path,
          sellerId: session?.user?.id,
        })
        .then(async (response) => {
          console.log(response)
          notify({
            title: "Berhasil",
            message: "Data berhasil ditambah. Mengarahkan ke Marketplace",
          })
          if (response) {
            router.push("/marketplace")
          }
          setIsSubmitting(false)
        })
        .catch((error) => {
          notify({
            title: "Gagal",
            message: "Data tidak valid. Lengkapi Formulir",
          })
          setIsSubmitting(false)
          setErrorMessage(error)
          console.error(error)
        })
    } catch (error) {
      notify({ title: "Gagal", message: "Data tidak valid. Lengkapi" })
      setIsSubmitting(false)
      setErrorMessage(error)
      console.error(error)
    }
  }

  const displayPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price)

  if (session) {
    return (
      <>
        {session?.user?.role === "SELLER" && (
          <section className="px-4 lg:px-96 overflow-y-auto h-[82vh] flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Link
                href={"/marketplace"}
                className="flex flex-row items-center"
              >
                <BiChevronLeft />
                Go Back
              </Link>
              <h3 className="font-light">Add Product</h3>
            </div>
            <div className="flex flex-col lg:flex-row">
              <h1 className="text-xl lg:text-6xl font-black py-6">
                Tambah Produk
              </h1>
              <form
                className="flex flex-col w-full gap-4 pb-20"
                onSubmit={handleCreateProduct}
              >
                <div className="flex flex-col text-md lg:text-lg gap-2">
                  <label>Nama Produk</label>
                  <input
                    placeholder="Isi nama produk"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-md px-4 py-2"
                  />
                  {title && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti: {title}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-md lg:text-lg gap-2">
                  <label>Deskripsi Produk</label>
                  <textarea
                    placeholder="Isi deskripsi produk"
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded-md px-4 py-2 h-[20vh]"
                  />
                  {description && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti: {description}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-md lg:text-lg gap-2">
                  <label>Harga Produk (kg)</label>
                  <input
                    placeholder="Isi harga produk"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded-md px-4 py-2"
                    pattern="[1-9][0-9]"
                  />
                  {price && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti:
                      {displayPrice}/kg
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-lg gap-2">
                  <label>No. WA untuk Penjualan</label>
                  <input
                    placeholder="Isi No. WA anda"
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border rounded-md px-4 py-2"
                  />
                  {phoneNumber && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti: +62{phoneNumber}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-lg gap-2">
                  <label>Foto Produk</label>
                  <div className="relative">
                    <div className="absolute h-[40vh] w-full border-2 flex object-cover border-dashed -z-10">
                      {selectedImage ? (
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="preview-image"
                          width={0}
                          height={0}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="flex w-full h-full justify-center items-center">
                          <HiOutlineUpload className="scale-150" />
                        </div>
                      )}
                    </div>
                    <input
                      placeholder="Input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border pt-96 pb-3 w-full px-3"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="border bg-cyan-500 text-white px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 hover:bg-white transition delay-0 ease-in"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        )}
        {session?.user?.role === "ADMIN" && (
          <section className="px-4 lg:px-96 overflow-y-auto h-[82vh] flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Link
                href={"/marketplace"}
                className="flex flex-row items-center"
              >
                <BiChevronLeft />
                Go Back
              </Link>
              <h3 className="font-light">Add Product</h3>
            </div>
            <div className="flex flex-col lg:flex-row">
              <h1 className="text-xl lg:text-6xl font-black py-6">
                Tambah Produk
              </h1>
              <form
                className="flex flex-col w-full gap-4 pb-20"
                onSubmit={handleCreateProduct}
              >
                <div className="flex flex-col text-md lg:text-lg gap-2">
                  <label>Nama Produk</label>
                  <input
                    placeholder="Isi nama produk"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-md px-4 py-2"
                  />
                  {title && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti: {title}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-md lg:text-lg gap-2">
                  <label>Deskripsi Produk</label>
                  <textarea
                    placeholder="Isi deskripsi produk"
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded-md px-4 py-2 h-[20vh]"
                  />
                  {description && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti: {description}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-md lg:text-lg gap-2">
                  <label>Harga Produk (kg)</label>
                  <input
                    placeholder="Isi harga produk"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded-md px-4 py-2"
                    pattern="[1-9][0-9]"
                  />
                  {price && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti:
                      {displayPrice}/kg
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-lg gap-2">
                  <label>No. WA untuk Penjualan</label>
                  <input
                    placeholder="Isi No. WA anda"
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border rounded-md px-4 py-2"
                  />
                  {phoneNumber && (
                    <div className="text-xs font-light w-1/2 truncate">
                      Akan ditampilkan seperti: +62{phoneNumber}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-lg gap-2">
                  <label>Foto Produk</label>
                  <div className="relative">
                    <div className="absolute h-[40vh] w-full border-2 flex object-cover border-dashed -z-10">
                      {selectedImage ? (
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="preview-image"
                          width={0}
                          height={0}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="flex w-full h-full justify-center items-center">
                          <HiOutlineUpload className="scale-150" />
                        </div>
                      )}
                    </div>
                    <input
                      placeholder="Input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border pt-96 pb-3 w-full px-3"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="border bg-cyan-500 text-white px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 hover:bg-white transition delay-0 ease-in"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        )}
        {session?.user?.role === "USER" && (
          <div className="h-[82vh] flex justify-center items-center">
            Anda tidak berhak mengakses halaman ini
          </div>
        )}
        <Toaster />
      </>
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
