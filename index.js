export default {
  async fetch(request, env, ctx) {
    return new Response(JSON.stringify({
      message: "Hello from Cosmo — your Worker is live 🌱"
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
};
