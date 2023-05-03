import Image from "next/image"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { HiOutlineUpload } from "react-icons/hi"

export default function AddProductPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [title, setTitle] = useState<any>()
  const [description, setDescription] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [phoneNumber, setPhoneNumber] = useState<any>()
  const [selectedImage, setSelectedImage] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<any>(null)
  const [afterSubmit, setAfterSubmit] = useState<any>(null)

  const handleFileChange = (e: any) => {
    setSelectedImage(e.target.files[0])
  }

  const handleCreateProduct = async (e: any) => {
    e.preventDefault()

    const delay = (s: any) => new Promise((resolve) => setTimeout(resolve, s))

    setErrorMessage(null)
    try {
      const { data, error } = await supabase.storage
        .from("fishindo-bucket")
        .upload("products/" + session?.user?.id + "/" + uuidv4(), selectedImage)
      if (error) {
        setErrorMessage(error)
        console.error(error)
      }

      await axios
        .post("http://localhost:3000/api/products", {
          title: title,
          description: description,
          price: parseInt(price),
          phoneNumber: phoneNumber,
          imagePath: data?.path,
          sellerId: session?.user?.id,
        })
        .then(async (response) => {
          console.log(response)
        })
        .catch((error) => {
          setErrorMessage(error)
          console.error(error)
        })
    } catch (error) {
      setErrorMessage(error)
      console.error(error)
    }
  }

  return (
    <section className="px-96 overflow-y-auto h-[82vh] flex flex-row">
      <div className="w-full">
        <h1 className="text-3xl font-black py-6">Tambah Produk</h1>
        <form className="flex flex-col w-full gap-4 pb-20">
          <div className="flex flex-col text-lg gap-2">
            <label>Nama Produk</label>
            <input
              placeholder="Isi nama produk"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md px-4 py-2"
            ></input>
          </div>
          <div className="flex flex-col text-lg gap-2">
            <label>Deskripsi Produk</label>
            <textarea
              placeholder="Isi deskripsi produk"
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md px-4 py-2"
            ></textarea>
          </div>
          <div className="flex flex-col text-lg gap-2">
            <label>Harga Produk</label>
            <input
              placeholder="Isi harga produk"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-md px-4 py-2"
            ></input>
          </div>
          <div className="flex flex-col text-lg gap-2">
            <label>No. WA untuk Penjualan</label>
            <input
              placeholder="Isi No. WA anda"
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded-md px-4 py-2"
            ></input>
          </div>
          <div className="flex flex-col text-lg gap-2">
            <label>Foto Produk</label>
            <div className="relative">
              <div className="absolute h-[38vh] w-full border-2 flex object-cover border-dashed -z-10">
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
              ></input>
            </div>
          </div>
          <button
            onClick={handleCreateProduct}
            className="border bg-cyan-500 text-white px-8 py-4 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-cyan-800 hover:border-cyan-800 hover:bg-white transition delay-0 ease-in"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-full px-8">
        <h1 className="text-3xl font-black py-6">Preview Data</h1>
        <div>
          <h1>Nama Produk</h1>
          <p>{title}</p>
          <h1>Deskripsi Produk</h1>
          <p>{description}</p>
          <h1>Harga Produk</h1>
          <p>{price && price}</p>
          <h1>No. HP untuk Penjualan</h1>
          <p>{phoneNumber && `+62${phoneNumber}`}</p>
        </div>
      </div>
    </section>
  )
}
