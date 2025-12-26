const API_URL = "https://sd.intiger.site/generate"; // replace with your API domain

const btn = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const negativeInput = document.getElementById("negative-prompt");
const numImagesSelect = document.getElementById("num_images");
const status = document.getElementById("status");
const results = document.getElementById("results");

btn.onclick = async () => {
  const prompt = promptInput.value.trim();
  const negativePrompt = negativeInput ? negativeInput.value.trim() : "";
  const num_images = parseInt(numImagesSelect.value || "1", 10);
  if (!prompt) return;

  status.textContent = "Generating...";
  results.innerHTML = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, negative_prompt: negativePrompt, num_images })
    });

    const data = await res.json();

    // Normalize images into an array of URLs or base64 strings
    let images = [];
    if (Array.isArray(data.images)) images = data.images;
    else if (Array.isArray(data.image)) images = data.image;
    else if (typeof data.images === 'string') images = [data.images];
    else if (typeof data.image === 'string') images = [data.image];

    // Render up to requested number of images
    images.slice(0, num_images).forEach((src, idx) => {
      const card = document.createElement('div');
      card.className = 'image-card';

      const imgEl = document.createElement('img');

      // If API returned a plain path/URL, use it. If it returned base64, detect and convert.
      if (src.startsWith('data:') || src.startsWith('http') || src.startsWith('/')) {
        imgEl.src = src;
      } else {
        imgEl.src = 'data:image/png;base64,' + src;
      }

      const link = document.createElement('a');
      link.className = 'download-btn';
      link.href = imgEl.src;
      link.download = `image-${idx+1}.png`;
      link.textContent = 'Download';

      card.appendChild(imgEl);
      card.appendChild(link);
      results.appendChild(card);
    });

    status.textContent = '';
    if (images.length === 0) status.textContent = 'No images returned from API';
  } catch (err) {
    console.error(err);
    status.textContent = 'Error generating image';
    results.innerHTML = '';
  }
};

