import GenerationForm from "@/components/GenerationForm";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <main className="lg:px-24 lg:pb-24 lg:pt-10 p-5">
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
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Generate Images
        </h2>
        <p className="text-muted-foreground font-light text-sm text-center">
          Customise size and number of images, fill in a prompt and watch the
          magic happen!
        </p>
      </section>
      <section>
        <GenerationForm />
      </section>
    </main>
  );
}
