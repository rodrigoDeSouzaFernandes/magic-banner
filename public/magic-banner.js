(async function () {
  const url = window.location.href;

  try {

    const res = await fetch(
      `http://localhost:3000/api/banners?url=${encodeURIComponent(url)}`
    );

    const banner = await res.json();
    if (!banner) return;

    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = banner.image;
    img.style.width = "100%";
    img.style.maxHeight = '300px'
    img.style.objectFit = "cover"

    container.appendChild(img);
    document.body.prepend(container);
    
  } catch (e) {
    console.error("Magic Banner error", e);
  }
})();
