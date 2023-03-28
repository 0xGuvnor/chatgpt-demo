import { openai } from "@/lib/openai";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  text: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { text } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
        }, // this represents the bot and what role they will assume
        { role: "user", content: `Finish my thought: ${text}` }, // the message that the user sends
      ],
    });

    console.log(response.data.choices[0].message?.content);
    res.status(200).json({ text: response.data.choices[0].message?.content });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
