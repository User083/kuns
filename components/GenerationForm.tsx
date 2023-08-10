"use client";
import { useForm } from "react-hook-form";

interface IProps {
  prompt: string;
  amount: string;
  resolution: string;
}

const GenerationForm = () => {
  const form = useForm({
    defaultValues: { prompt: "", amount: "1", resolution: "256x256" },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: IProps) => {
    console.log(values);
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full p-4 px-3 md:px6 flex"
      >
        <input
          name="prompt"
          type="text"
          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-white bg-black w-full"
          aria-label="Prompt input"
          disabled={isLoading}
          placeholder="What does your heart desire?"
          onChange={() => {
            console.log(form.getValues(), "VALUES");
          }}
        />
        <button
          name="Submit"
          className="p-2 hover:text-gray-400"
          aria-label="Submit prompt"
          disabled={isLoading}
        >
          Generate
        </button>
      </form>
    </>
  );
};

export default GenerationForm;
