import { NextResponse } from "next/server";
import { createUser } from "@/db/models/user";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const GET = async () => {
  return Response.json(
    {
      statusCode: 200,
      message: "Pong from GET /api/users !",
    },
    {
      status: 200,
    }
  );
};

const userInputSchema = z.object({
  name: z.string().optional(),
  username: z.string().min(1, { message: "Username tidak boleh kosong" }),
  email: z.string().email({ message: "Format email salah" }),
  password: z.string().min(5, { message: "Password minimal 5 karakter" }),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const parsedData = userInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Pong from POST /api/users !",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);
      const errMessage = err.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: errMessage,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
      },
      {
        status: 500,
      }
    );
  }
};
