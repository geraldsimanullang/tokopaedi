"use server";

import { getUserByEmail } from "@/db/models/user";
import { comparePasswordWithHash } from "@/db/utils/bcrypt";
import { signToken } from "@/lib/jsonwebtoken";

import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const handleLogin = async (formData: FormData) => {
  const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    return redirect(`${BASE_URL}/login?error=${errFinalMessage}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (
    !user ||
    !comparePasswordWithHash(parsedData.data.password, user.password)
  ) {
    return redirect(`${BASE_URL}/login?error=Invalid%20credentials`);
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = signToken(payload);

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    sameSite: "strict",
  });

  return redirect(`${BASE_URL}`);
};
