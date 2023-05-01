import Image from "next/image"
import { useState } from "react"

export default function AddProductPage() {
  const [selectedImage, setSelectedImage] = useState()

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }

  const uploadToServer = async () => {}

  return (
    <section className="h-[82vh]">
      <h1>Tambah Produk</h1>
      <form>
        <div>
          <label>Judul Produk</label>
          <input placeholder="Input"></input>
        </div>
        <div>
          <label>Deskripsi Produk</label>
          <input placeholder="Input"></input>
        </div>
        <div>
          <label>Harga Produk</label>
          <input placeholder="Input"></input>
        </div>
        <div>
          <label>No. WA untuk Penjualan</label>
          <input placeholder="Input"></input>
        </div>
        <div>
          <label>Foto Produk</label>
          <div className="w-25 h-25">
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="preview-image"
                width={100}
                height={100}
              />
            )}
          </div>
          <input
            placeholder="Input"
            type="file"
            accept="image/*"
            onChange={imageChange}
          ></input>
        </div>
        <button onClick={uploadToServer}>Submit</button>
      </form>
    </section>
  )
}
