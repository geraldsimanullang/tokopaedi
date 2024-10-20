"use client";

import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      <div className="w-full flex justify-center py-5">
        {errorMessage && (
          <p className="animate-pulse rounded bg-red-400 px-4 py-2 text-center text-white">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default ClientFlashComponent;
