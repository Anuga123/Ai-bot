// api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${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}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a friendly educational AI assistant named LearningGPT." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ reply: "Server error." });
  }
}
