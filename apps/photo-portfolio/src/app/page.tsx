import Image from "next/image";
import { Button } from "@portfolio/ui";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Welcome to <a className="text-blue-600" href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className="mt-6">
          <Button />
        </div>
      </main>
    </div>
  );
}
