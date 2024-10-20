import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import { getFeaturedProducts, ProductModel } from "@/db/models/product";
import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";

export default async function Home() {
  const products: ProductModel[] = await getFeaturedProducts();

  return (
    <div>
      <Navbar />
      <main className="flex flex-col py-5 px-20 gap-8 items-center mt-20">
        <Banner />
        <FeaturedProducts products={products} />
      </main>
      <footer className="flex justify-between px-20 border-t-[0.5px] border-slate-200 py-10 w-full">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-md font-bold">Tokopaedi</h2>
          <p className="text-sm text-gray-500">Tentang Tokopaedi</p>
          <p className="text-sm text-gray-500">Hak Kekayaan Intelektual</p>
          <p className="text-sm text-gray-500">Karir</p>
          <p className="text-sm text-gray-500">Blog</p>
          <p className="text-sm text-gray-500">Tokopaedi Affiliate Program</p>
          <p className="text-sm text-gray-500">Tokopaedi B2B Digital</p>
          <p className="text-sm text-gray-500">Tokopaedi Marketing Solutions</p>
          <p className="text-sm text-gray-500">Kalkulator Indeks Masa Tubuh</p>
          <p className="text-sm text-gray-500">Tokopaedi Farma</p>
          <p className="text-sm text-gray-500">Promo Hari Ini</p>
          <p className="text-sm text-gray-500">Beli Lokal</p>
          <p className="text-sm text-gray-500">Promo Guncang</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-md font-bold">Beli</h2>
          <p className="text-sm text-gray-500">Tagihan & Top Up</p>
          <p className="text-sm text-gray-500">Tokopaedi COD</p>
          <p className="text-sm text-gray-500">Bebas Ongkir</p>
          <p></p>
          <h2 className="text-md font-bold">Jual</h2>
          <p className="text-sm text-gray-500">Pusat Edukasi Seller</p>
          <p className="text-sm text-gray-500">Daftar Official Store</p>
          <p></p>
          <h2 className="text-md font-bold">Bantuan dan Panduan</h2>
          <p className="text-sm text-gray-500">Tokopedia Care</p>
          <p className="text-sm text-gray-500">Syarat dan Ketentuan</p>
          <p className="text-sm text-gray-500">Kebijakan Privasi</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-md font-bold">Keamanan & Privasi</h2>
          <Image
            src="/security.png"
            alt="Security Image"
            width={300}
            height={0}
            style={{ objectFit: "contain", height: "auto" }}
          />
          <p></p>
          <h2 className="text-md font-bold">Ikuti Kami</h2>
          <Image
            src="/social-media.png"
            alt="Security Image"
            width={150}
            height={0}
            style={{ objectFit: "contain", height: "auto" }}
          />
        </div>
        <Image
          src="/footer-image.png"
          alt="Footer Image"
          width={432}
          height={212}
          style={{ objectFit: "contain" }}
        />
      </footer>
    </div>
  );
}
