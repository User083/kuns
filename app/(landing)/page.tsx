import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex gap-10 p-10">
        <Link href="/sign-up">
          <button className="p-3 bg-gray-400 rounded-xl">Register</button>
        </Link>
        <Link href="/sign-in">
          <button className="p-3 bg-gray-400 rounded-xl">Login</button>
        </Link>
      </section>
    </main>
  );
}
