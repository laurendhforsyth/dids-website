document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".carousel-slide");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const INTERVAL_MS = 5000;
  let current = 0;
  let timer = null;

  const dots = Array.from(slides, (slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Show slide ${i + 1}`);
    dot.addEventListener("click", () => {
      show(i);
      start();
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
    });
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function go(index) {
    show(index);
    start();
  }

  carousel.querySelector(".carousel-arrow.prev").addEventListener("click", () => go(current - 1));
  carousel.querySelector(".carousel-arrow.next").addEventListener("click", () => go(current + 1));
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(current - 1);
    else if (e.key === "ArrowRight") go(current + 1);
  });

  function start() {
    stop();
    timer = setInterval(() => show(current + 1), INTERVAL_MS);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  show(0);
  start();
});
