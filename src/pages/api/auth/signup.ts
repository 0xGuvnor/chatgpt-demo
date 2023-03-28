import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username,
        secret: password,
      },
      {
        headers: {
          "Private-Key": process.env.NEXT_PUBLIC_PRIVATE_KEY,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
