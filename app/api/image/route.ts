import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount, resolution } = body;
    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    if (!userId) {
      return new NextResponse("Unauthorised request - are you logged in?", {
        status: 401,
      });
    }
    if (!config.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required", {
        status: 401,
      });
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log(error, "Image Error");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
