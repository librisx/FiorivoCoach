export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 700
      })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices?.[0]?.message?.content || "Keine Antwort erhalten." });
  } catch (err) {
    res.status(500).json({ error: "Serverfehler", detail: err.message });
  }
}
