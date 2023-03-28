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

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",

      {
        headers: {
          "Project-ID": process.env.NEXT_PUBLIC_PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
