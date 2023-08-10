"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import { amountOptions, resolutionOptions } from "@/app/(dashboard)/constants";
import Image from "next/image";

interface IProps {
  prompt: string;
  amount: string;
  resolution: string;
}

const GenerationForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: { prompt: "", amount: "1", resolution: "256x256" },
  });
  const isLoading = form.formState.isSubmitting;
  const [images, setImages] = useState<string[]>([]);

  const onSubmit = async (values: IProps) => {
    console.log(values);
    // try {
    //   setImages([]);
    //   const response = await axios.post("/api/image", values);
    //   const urls = response.data.map((image: { url: string }) => image.url);
    //   setImages(urls);
    //   form.reset();
    // } catch (error) {
    // } finally {
    //   router.refresh();
    // }
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full p-4 px-3 md:px6 flex flex-col gap-3 items-center"
      >
        <section className="flex gap-5 ">
          <h3>Options</h3>
          <select
            aria-label="Amount"
            disabled={isLoading}
            className="bg-black text-white"
            {...form.register("amount")}
          >
            {amountOptions.map((amount) => (
              <option
                label={amount.label}
                value={amount.value}
                key={amount.value}
              />
            ))}
          </select>
          <select
            aria-label="Resolution"
            disabled={isLoading}
            className="bg-black text-white"
            {...form.register("resolution")}
          >
            {resolutionOptions.map((resolution) => (
              <option
                key={resolution.value}
                label={resolution.label}
                value={resolution.value}
              />
            ))}
          </select>
        </section>
        <section className="w-full flex">
          <input
            type="text"
            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-white bg-black w-full"
            aria-label="Prompt input"
            disabled={isLoading}
            placeholder="What does your heart desire?"
            {...form.register("prompt")}
          />
          <button
            name="Submit"
            type="submit"
            className="p-2 hover:text-gray-400"
            aria-label="Submit prompt"
            disabled={isLoading}
          >
            Generate
          </button>
        </section>
      </form>
      <section className="w-full flex items-center justify-center p-5">
        {isLoading && <Loader />}
        {images.length === 0 && !isLoading && (
          <>
            <p className="text-white">No images generated yet</p>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((source) => (
            <article className="rounded-lg overflow-hidden" key={source}>
              <section className="relative aspect-square">
                <Image fill alt="Image" src={source} />
              </section>
              <section>
                <button
                  onClick={() => window.open(source)}
                  className="p-4 bg-black text-white"
                >
                  Download
                </button>
              </section>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default GenerationForm;
