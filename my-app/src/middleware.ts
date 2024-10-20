import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyTokenJose } from "./lib/jsonwebtoken";

const middleware = async (request: NextRequest) => {
  if (request.url.includes("/wishlist")) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const loginUrl = new URL("/login", request.url);
    if (!token?.value) {
      NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
      return NextResponse.redirect(loginUrl);
    }

    let tokenData;

    try {
      tokenData = await verifyTokenJose<{ id: string; email: string }>(
        token.value
      );
    } catch (error) {
      NextResponse.json(
        {
          error,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
      return NextResponse.redirect(loginUrl);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};

export default middleware;
