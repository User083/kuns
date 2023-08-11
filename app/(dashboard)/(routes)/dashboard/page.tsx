import GenerationForm from "@/components/GenerationForm";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <main className="px-24 pb-24 pt-10">
      <section className="mb-8 space-y-4">
        <div className="flex w-full justify-between items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            aria-label="logo"
            height={70}
            width={70}
          />

          <div className="flex items-center w-full justify-end p-5 gap-3">
            <p className="text-sm">Sign out</p>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Set your imagination free
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Generate some images
        </p>
      </section>
      <section>
        <GenerationForm />
      </section>
    </main>
  );
}
