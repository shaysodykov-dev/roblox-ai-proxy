import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/roblox-chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-5.2",
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (err) {
    res.status(500).json({ reply: "AI error." });
  }
});

app.get("/", (req, res) => {
  res.send("Proxy running");
});

app.listen(process.env.PORT || 3000);
