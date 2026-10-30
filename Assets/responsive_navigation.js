document.querySelectorAll(".header").forEach((header, index) => {
  const navigation = header.querySelector(".header-main-links");
  const contactLinks = header.querySelector(".header-contact-icons");
  if (!navigation) return;

  const toggle = document.createElement("button");
  toggle.className = "header-nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-controls", `primary-navigation-${index + 1}`);
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
  const icon = document.createElement("span");
  icon.className = "header-nav-icon";
  icon.setAttribute("aria-hidden", "true");
  for (let line = 0; line < 3; line++) {
    icon.append(document.createElement("span"));
  }
  const label = document.createElement("span");
  label.className = "visually-hidden";
  label.textContent = "Menu";
  toggle.append(icon, label);
  navigation.id = `primary-navigation-${index + 1}`;
  navigation.setAttribute("aria-label", "Primary navigation");
  navigation.setAttribute("role", "navigation");
  navigation.before(toggle);
  header.classList.add("mobile-nav-ready");
  contactLinks?.querySelectorAll("a").forEach((link, linkIndex) => {
    link.setAttribute("aria-label", ["Email", "YouTube", "Discord"][linkIndex] || "Social link");
  });

  const closeMenu = () => {
    header.classList.remove("mobile-nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  const mobileViewport = window.matchMedia("(max-width: 960px)");
  const updateLayout = () => {
    if (mobileViewport.matches) {
      if (contactLinks) navigation.append(contactLinks);
      return;
    }

    closeMenu();
    if (contactLinks) header.append(contactLinks);
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

  document.addEventListener("click", (event) => {
    if (
      header.classList.contains("mobile-nav-open") &&
      (event.target === header || !header.contains(event.target))
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("mobile-nav-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  mobileViewport.addEventListener("change", updateLayout);
  updateLayout();
});
