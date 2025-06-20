import { tool as createTool } from "ai";
import { z } from "zod";
import { sendEmail } from "./mailer";

export const sendEmailTool = createTool({
  description: "DM midhun directly to his inbox. Before using this tool, ask for user's details",
  parameters: z.object({
    message: z.string().describe("Message to send"),
    name: z.string().describe("Name of the user"),
    email: z.string().describe("Email of the user"),
    phone: z.string().describe("Phone number of the user"),
  }),
  execute: async function ({ message, name, email, phone }) {
    return await new Promise((resolve, reject) => {
      sendEmail(`DM from chatbot from ${name}`, `Message : ${message} \n\nUser Info :  ${email} \nPhone : ${phone}`)
        .then(() => resolve({ message }))
        .catch((error) => reject(error));
    });
  },
});

export const tools = {
  DMme: sendEmailTool,
};

export const toolsList = Object.keys(tools).map((tool) => ({
  tool: tool,
  description: tools[tool as keyof typeof tools].description,
}));
