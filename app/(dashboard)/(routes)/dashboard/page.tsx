import GenerationForm from "@/components/GenerationForm";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <article>
      <section className="mb-8 space-y-4">
        <div className="flex items-center w-full justify-end p-5 gap-3">
          <p className="text-sm">Sign out</p>
          <UserButton afterSignOutUrl="/" />
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
    </article>
  );
}
