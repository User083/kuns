"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import {
  amountOptions,
  resolutionOptions,
} from "@/app/(dashboard)/(routes)/dashboard/constants";

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
      const response = await axios.post("/api/image", values);
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
        className="rounded-lg border w-full p-4 px-3 md:px6 flex flex-col gap-3 items-center"
      >
        <section className="flex gap-5 ">
          <h3>Options</h3>
          <select
            aria-label="Amount"
            disabled={isLoading}
            name="Amount"
            className="bg-black text-white"
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
            name="Resolution"
            className="bg-black text-white"
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
            name="prompt"
            type="text"
            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-white bg-black w-full"
            aria-label="Prompt input"
            disabled={isLoading}
            placeholder="What does your heart desire?"
          />
          <button
            name="Submit"
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
      </section>
    </>
  );
};

export default GenerationForm;
