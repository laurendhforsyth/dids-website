document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".carousel-slide");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const slidesContainer = carousel.querySelector(".carousel-slides");
  const INTERVAL_MS = 5000;
  let current = 0;

  const dots = Array.from(slides, (slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Show slide ${i + 1}`);
    dot.setAttribute("aria-current", "false");
    dot.addEventListener("click", () => {
      show(i);
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function show(index) {
    const previous = current;
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle("previous", i === previous && i !== current);
      s.classList.toggle("active", i === current);
      const active = i === current;
      s.setAttribute("aria-hidden", String(!active));
      s.inert = !active;
    });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === current);
      d.setAttribute("aria-current", String(i === current));
    });
  }

  carousel.querySelector(".carousel-arrow.prev").addEventListener("click", () => show(current - 1));
  carousel.querySelector(".carousel-arrow.next").addEventListener("click", () => show(current + 1));
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });

  show(0);
  slidesContainer.setAttribute("aria-live", "off");
  setInterval(() => show(current + 1), INTERVAL_MS);
});
