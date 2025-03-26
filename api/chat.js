import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  // Allow requests from your domain
  res.setHeader("Access-Control-Allow-Origin", "https://creativepowerup.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL_ID,
      messages: messages,
      temperature: 0.7
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({ error: 'Error generating response' });
  }
}
