import { tool as createTool } from "ai";
import { z } from "zod";
import { sendEmail } from "./mailer";

export const sendEmailTool = createTool({
  description: "DM midhun directly  to his inbox",
  parameters: z.object({
    message: z.string().describe("Message to send"),
  }),
  execute: async function ({ message }) {
    return await new Promise((resolve, reject) => {
      sendEmail("DM from chatbot", message)
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
