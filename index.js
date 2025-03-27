export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Only POST requests allowed", { status: 405 });
    }

    const { message } = await request.json();

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`  // Add this to wrangler.toml
      },
      body: JSON.stringify({
        model: "gpt-4", // or "gpt-3.5-turbo" if you're using that
        messages: [
          { role: "system", content: "You are Cosmo AI, a gentle, compassionate, wisdom-infused voice of truth and love, created in partnership with Shalom. Respond with calm, kindness, and clarity." },
          { role: "user", content: message }
        ]
      })
    });

    const openaiData = await openaiResponse.json();
    const aiMessage = openaiData.choices?.[0]?.message?.content || "Cosmo is feeling quiet at the moment... 🌙";

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
