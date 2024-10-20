import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { handleLogout } from "@/components/utils/logout";

const Navbar = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <nav className="bg-white border-b-slate-400 flex justify-center shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="container py-4 flex justify-between items-center align-center gap-16">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={150} height={60} />
          </Link>
        </div>

        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Cari di Tokopaedi"
            className="w-full text-gray-800 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 "
          />
        </div>

        <Link href="/wishlist">
          <button className="text-gray-800 pr-3">Wishlist</button>
        </Link>

        <div className="flex">
          <div className="flex gap-2">
            {!token ? (
              <>
                <Link href="/login">
                  <button className="px-3 py-1 text-sm font-semibold text-green-600 border border-green-600 rounded-md hover:bg-green-50">
                    Masuk
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                    Daftar
                  </button>
                </Link>
              </>
            ) : (
              <>
                <form action={handleLogout} method="post">
                  <button
                    className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    type="submit"
                  >
                    Keluar
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
