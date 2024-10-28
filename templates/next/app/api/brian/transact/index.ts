import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { BrianSDK } from "@brian-ai/sdk";

const brianSDK = new BrianSDK({ apiKey: process.env.BRIAN_API_KEY! });

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const { prompt, address } = await req.json();

    if (!prompt) {
      res.status(400).send({ error: "Prompt is required" });
      return;
    }

    if (!address) {
      res.status(400).send({ error: "Address is required" });
      return;
    }

    const brianResponse = await brianSDK.transact({
      prompt,
      address,
      chainId: "8453",
    });

    return res.status(200).send({ result: brianResponse });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred" });
    }
  }
};
