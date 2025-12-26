const API_URL = "https://sd.intiger.site/generate";
// ↑ thay bằng domain API của bạn

const btn = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const img = document.getElementById("output");
const status = document.getElementById("status");

btn.onclick = async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  status.textContent = "Generating...";
  img.src = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    img.src = "data:image/png;base64," + data.image;
    status.textContent = "";
  } catch (err) {
    console.error(err);
    status.textContent = "Error generating image";
  }
};

