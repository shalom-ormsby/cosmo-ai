export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({ message: "GET working — the API is alive 🌱" });
  }

  if (req.method === "POST") {
    return res.status(200).json({ message: "POST working — ready to receive 🌟" });
  }

  return res.status(405).json({ error: "Method not allowed." });
}

