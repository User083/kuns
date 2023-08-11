import Link from "next/link";
import Image from "next/image";
import { BiLogInCircle, BiSolidDashboard } from "react-icons/bi";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col items-center px-24 pb-24 pt-10">
      <section className="flex w-full max-h-[100px] h-full justify-between items-center">
        <div className="flex items-center gap-1">
          <Image
            src="/logo.png"
            alt="Logo"
            aria-label="logo"
            height={70}
            width={70}
          />
        </div>
        <div className="flex gap-3 items-center">
          {userId ? (
            <>
              <Link href="/dashboard">
                <button className="text-3xl hover:text-tertiary">
                  <BiSolidDashboard />
                </button>
              </Link>
            </>
          ) : (
            <Link href="/sign-in">
              <button className="hover:text-tertiary text-3xl">
                <BiLogInCircle />
              </button>
            </Link>
          )}
        </div>
      </section>
      <section className="flex gap-10 p-10 h-full w-full items-center justify-center flex-col h-screen">
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-6xl font-bold text-center">
            Generate Free AI Images
          </h2>
          <p className="italic">powered by OpenAI</p>
        </div>
        <div className="flex gap-10">
          {" "}
          <Link href="/dashboard">
            <button className="p-3 bg-tertiary rounded-xl h-[70px] w-[150px] hover:bg-secondary flex gap-2 items-center justify-center text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
