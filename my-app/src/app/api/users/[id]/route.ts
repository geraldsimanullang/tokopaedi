import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const GET = (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  return NextResponse.json<MyResponse<unknown>>({
    statusCode: 200,
    message: `Pong from GET /api/users/${id} !`,
  });
};
