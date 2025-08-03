import * as dotnev from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

dotnev.config();

// Controller to generate image using Hugging Face API
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);

    if (!prompt || typeof prompt !== 'string') {
      return next(createError(400, "Prompt is required and must be a string."));
    }

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "application/json",
          "Accept": "image/png"
        },
        responseType: "arraybuffer", // Important to receive image binary
      }
    );

    const base64Image = Buffer.from(response.data, 'binary').toString("base64");

    return res.status(200).json({
      photo: `${base64Image}`,
    })
  } catch (error) {
    console.error("Hugging Face Error:", error?.response?.data || error.message);
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.error || error.message;
    return next(createError(status, message));
  }
};




//Setup openAI api Key

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// console.log(process.env.OPENAI_API_KEY)

// const openai = new OpenAIApi(configuration);

//controller to generate Image openAI


// export const generateImage = async (req, res, next) => {
//     try {
//         const { prompt } = req.body;

//         const response = await openai.createImage({
//             prompt,
//             n: 1,
//             size: "1024x1024",
//             response_format: "b64_json"
//         });
//         const generatedImage = response.data.data[0].b64_json;
//         return res.status(200).json({ photo: generatedImage });

//     } catch (error) {
//         next(createError(error.status, error?.response?.data?.error?.message || error?.message));

//     }
// }

