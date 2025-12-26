const API_URL = "https://sd.intiger.site/generate";
// ↑ thay bằng domain API của bạn

const btn = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const negativeInput = document.getElementById("negative-prompt");
const img = document.getElementById("output");
const status = document.getElementById("status");
const download = document.getElementById("download");

btn.onclick = async () => {
  const prompt = promptInput.value.trim();
  const negativePrompt = negativeInput ? negativeInput.value.trim() : "";
  if (!prompt) return;

  status.textContent = "Generating...";
  download.style.display = "none";
  img.src = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, negative_prompt: negativePrompt })
    });

    const data = await res.json();
    img.src = "data:image/png;base64," + data.image;
    // Enable download link
    download.href = img.src;
    download.style.display = "inline-block";
    status.textContent = "";
  } catch (err) {
    console.error(err);
    status.textContent = "Error generating image";
    download.style.display = "none";
  }
};

