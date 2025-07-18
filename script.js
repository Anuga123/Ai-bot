// public/script.js

// Handles message sending and receiving from backend API

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  document.querySelector("button").addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    appendMessage("user", message);
    userInput.value = "";

    try {
      // Call backend
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      // Display bot response
      appendMessage("bot", data.reply || "⚠️ AI returned no response.");
    } catch (err) {
      appendMessage("bot", "⚠️ Error contacting the server.");
      console.error("Fetch error:", err);
    }
  }

  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
