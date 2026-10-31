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
    const link = event.target.closest("a");
    if (link && !link.classList.contains("nav-dropdown-trigger")) closeMenu();
  });

  navigation.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");

    const sync = () => {
      const open = dropdown.classList.contains("is-open") || dropdown.classList.contains("is-hover");
      trigger.setAttribute("aria-expanded", String(open));
    };
    const close = () => {
      dropdown.classList.remove("is-open", "is-hover");
      sync();
    };

    dropdown.addEventListener("mouseenter", () => {
      if (mobileViewport.matches) return;
      dropdown.classList.add("is-hover");
      sync();
    });
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("is-hover");
      sync();
    });
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const pinned = dropdown.classList.contains("is-open");
      if (pinned) {
        close();
      } else {
        dropdown.classList.add("is-open");
        sync();
      }
    });
    dropdown.querySelectorAll(".nav-dropdown-menu a").forEach((link) => {
      link.addEventListener("click", close);
    });
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && dropdown.classList.contains("is-open")) {
        close();
        trigger.focus();
      }
    });
    mobileViewport.addEventListener("change", close);
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
