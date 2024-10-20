import ClientFlashComponent from "@/components/ClientFlashComponent";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Register = () => {
  const handleRegister = async (formData: FormData) => {
    "use server";

    type MyResponse<T> = {
      statusCode: number;
      message?: string;
      data?: T;
      error?: string;
    };

    const response = await fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson: MyResponse<unknown> = await response.json();

    if (!response.ok) {
      const message = responseJson.error ?? "Something went wrong!";

      return redirect(`/register?error=${message}`);
    }

    return redirect("/login");
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-white">
      <nav className="flex justify-center h-14 pt-5">
        <Link href="/">
          <div>
            <Image
              src={"/logo.svg"}
              alt="Image"
              width={150}
              height={0}
              style={{ height: "auto" }}
            />
          </div>
        </Link>
      </nav>
      <main className="flex flex-grow pb-20 gap-10">
        <div className="w-1/2 flex flex-col justify-center items-end pr-16">
          <Image
            src={"/register-image.png"}
            alt="Image"
            width={350}
            height={0}
            className="pb-8"
            style={{ height: "auto" }}
          />
          <p className="text-xl font-semibold">
            Jual Beli Mudah Hanya di Tokopaedi
          </p>
          <p>Gabung dan rasakan bertransaksi di Tokopaedi</p>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start pl-10">
          <div className="flex flex-col shadow-md pb-10 px-16 justify-center items-center">
            <Suspense>
              <ClientFlashComponent />
            </Suspense>
            <p className="font-bold text-2xl">Daftar Sekarang</p>
            <p className="text-sm">
              Sudah punya akun Tokopaedi?{" "}
              <Link href="/login" className="text-green-500">
                Masuk
              </Link>
            </p>
            <form
              action={handleRegister}
              className="flex flex-col gap-5 py-3 w-72"
            >
              <input
                className="border-[1px] p-3 text-sm rounded-lg focus:outline-none focus:border-green-500"
                type="text"
                name="name"
                placeholder="Nama"
              />
              <input
                className="border-[1px] p-3 text-sm rounded-lg focus:outline-none focus:border-green-500"
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                className="border-[1px] p-3 text-sm rounded-lg focus:outline-none focus:border-green-500"
                type="email"
                name="email"
                placeholder="Email"
              />
              <input
                className="border-[1px] p-3 text-sm rounded-lg focus:outline-none focus:border-green-500"
                type="password"
                name="password"
                placeholder="Password"
              />

              <button
                type="submit"
                className="bg-[#4dab5c] py-3 text-white font-semibold rounded-lg"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer className="h-20">
        <p className="text-center text-gray-400">2024, Tokopaedi</p>
      </footer>
    </div>
  );
};

export default Register;
