import Image from "next/image";
import Link from "next/link";

import ClientFlashComponent from "@/components/ClientFlashComponent";
import { handleLogin } from "./action";
import { Suspense } from "react";

export default async function Login() {
  return (
    <div
      className="flex flex-col min-h-screen min-w-screen bg-white"
      style={{
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: "55%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <nav className="flex justify-center h-14 pt-8">
        <Link href="/">
          <div>
            <Image
              src={"/logo.svg"}
              alt="Image"
              width={160}
              height={0}
              style={{ height: "auto" }}
            />
          </div>
        </Link>
      </nav>
      <main className="flex flex-grow pb-20 gap-10 justify-center items-center">
        <div className="flex flex-col gap-10 h-2/3 shadow-md bg-white px-10 pb-20 rounded-md">
          <Suspense>
            <ClientFlashComponent />
          </Suspense>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Masuk ke Tokopaedi</p>
            <Link href="/register" className="text-green-500 text-sm">
              Daftar
            </Link>
          </div>
          <form className="flex flex-col w-64 gap-5" action={handleLogin}>
            <input
              className="border-[1px] p-3 text-sm rounded-lg focus:outline-none focus:border-green-500"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className="border-[1px] p-3 text-sm rounded-lg focus:outline-none focus:border-green-500"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="bg-[#4dab5c] py-3 text-white font-semibold rounded-lg mt-5"
            >
              Masuk
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
