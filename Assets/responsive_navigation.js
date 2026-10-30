document.querySelectorAll(".header").forEach((header, index) => {
  const navigation = header.querySelector(".header-main-links");
  if (!navigation) return;

  const toggle = document.createElement("button");
  toggle.className = "header-nav-toggle";
  toggle.type = "button";
  toggle.textContent = "Menu";
  toggle.setAttribute("aria-controls", `primary-navigation-${index + 1}`);
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
  navigation.id = `primary-navigation-${index + 1}`;
  navigation.setAttribute("aria-label", "Primary navigation");
  navigation.setAttribute("role", "navigation");
  navigation.before(toggle);
  header.classList.add("mobile-nav-ready");

  const closeMenu = () => {
    header.classList.remove("mobile-nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    header.classList.add("mobile-nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("mobile-nav-open")) {
      closeMenu();
      toggle.focus();
    }
  });
});
