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
    try {
      setImages([]);
      const response = await axios.post("./api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
      form.reset();
    } catch (error) {
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full p-4 px-3 md:px-6 flex flex-col gap-3 items-center bg-black"
      >
        <section className="flex flex-col gap-5 sm:flex-row items-center justify-center w-full">
          <h3 className="font-semibold text-white">Options</h3>
          <select
            aria-label="Amount"
            disabled={isLoading}
            className="bg-[#000000] text-white text-sm rounded-xl p-3 w-full sm:w-[150px]"
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
            className="bg-[#000000] text-sm text-white rounded-xl p-3 w-full sm:w-[150px]"
            {...form.register("resolution")}
          >
            {resolutionOptions.map((resolution) => (
              <option
                className=""
                key={resolution.value}
                label={resolution.label}
                value={resolution.value}
              />
            ))}
          </select>
        </section>
        <section className="w-full flex flex-col gap-3 items-center justify-center md:flex-row">
          <input
            type="text"
            className="md:border-0 md:outline-none m:focus-visible:ring-0 md:focus-visible:ring-transparent text-white md:bg-transparent w-full p-3 my-2 rounded border bg-[#000000] text-sm"
            aria-label="Prompt input"
            disabled={isLoading}
            placeholder="What does your heart desire?"
            {...form.register("prompt")}
          />
          <button
            name="Submit"
            type="submit"
            className="p-3 hover:bg-white hover:text-black bg-[#000000] rounded-xl font-semibold text-sm w-full md:w-auto"
            aria-label="Submit prompt"
            disabled={isLoading}
          >
            Generate
          </button>
        </section>
      </form>
      <section className="w-full flex items-center justify-center p-1 md:p-5 bg-black rounded-xl my-10 border">
        {isLoading && <Loader />}
        {images.length === 0 && !isLoading && (
          <>
            <p className="text-white">No images generated yet</p>
          </>
        )}
        <div className="flex flex-wrap xl:flex-nowrap justify-center items-center gap-4 my-8">
          {images.map((source) => (
            <article
              className="rounded-lg overflow-hidden bg-white p-2 md:p-3 h-full w-full md:min-h-[360px] md:min-w-[300px] max-h-[660px] max-w-[600px]"
              key={source}
            >
              <section className="relative aspect-square ">
                <Image fill alt="Image" src={source} />
              </section>
              <section>
                <button
                  onClick={() => window.open(source)}
                  className="p-4 bg-[#000000] text-white rounded-xl hover:animate-pulse mt-3 w-full shadow-md"
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
