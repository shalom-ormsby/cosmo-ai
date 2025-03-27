export default {
  async fetch(request) {
    const { OPENAI_API_KEY } = process.env;

    const body = await request.json();
    const userMessage = body.message || "Hello, Cosmo";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are Cosmo AI, a compassionate, gentle, wisdom-sharing guide created by Shalom Ormsby. Speak with warmth, insight, and poetic grace. Respond from the heart."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ message: reply }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
