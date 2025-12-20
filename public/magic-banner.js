(async function () {
  const url = window.location.href;

  try {
    const res = await fetch(
      `https://magic-banner-plugin.vercel.app/api/banners?url=${encodeURIComponent(
        url
      )}`
    );

    if (!res.ok) return;

    const banner = await res.json();

    const container = document.createElement("div");
    container.style.opacity = "0";
    container.style.width = "100%";
    container.style.display = "flex";
    container.style.maxWidth = "100%";
    container.style.overflow = "hidden";
    container.style.borderRadius = "12px";
    container.style.marginBottom = "16px";
    container.style.transform = "translateY(-100%)";
    container.style.boxShadow = "0 4px 12px rgba(0,0,0, 0.5)";
    container.style.transition = "transform 0.3s ease, opacity 0.5s ease";

    const img = document.createElement("img");
    img.src = banner.image;
    img.style.width = "100%";
    img.style.objectFit = "cover";
    img.style.maxHeight = "300px";
    img.style.transition = "transform 0.3s ease";

    img.onload = () => {
      container.style.opacity = "1";
      container.style.transform = "translateY(0)";
    };

    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.03)";
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
    });

    container.appendChild(img);
    document.body.prepend(container);
  } catch (e) {
    console.error("Magic Banner error", e);
  }
})();
