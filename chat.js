// Serverless function for Vercel (Node.js)
// Handles CORS and returns a simple rule-based reply.
// Deploys free on https://vercel.com

function simpleBot(message = "") {
  const text = message.toLowerCase().trim();

  if (!text) return "Say something like: hello, help, flutter, or error.";

  if (text.includes("hello") || text.includes("salom") || text.includes("hi")) {
    return "Hi! I’m a demo bot. Ask me about Flutter, errors, or say 'help'.";
  }

  if (text.includes("help") || text.includes("yordam")) {
    return "Try: 'flutter', 'error', 'how to deploy', or just say 'hello'.";
  }

  if (text.includes("flutter")) {
    return "Flutter is for building cross-platform apps (Android, iOS, web) with one codebase.";
  }

  if (text.includes("error") || text.includes("bug")) {
    return "Read the error message carefully, search the exact text, and reproduce in a small example.";
  }

  if (text.includes("deploy") || text.includes("vercel") || text.includes("backend")) {
    return "This backend is a free Vercel Serverless Function. You send JSON {message}, it returns {reply}.";
  }

  // Fallback echo-style reply
  return `You said: "${message}". (Demo bot reply)`;
}

module.exports = async (req, res) => {
  // CORS for Flutter web & devices
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { message } = req.body || {};
    const reply = simpleBot(message);
    return res.status(200).json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal error" });
  }
};
