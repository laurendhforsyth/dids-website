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
  navigation.setAttribute("aria-label", "Primary");
  navigation.before(toggle);
  header.classList.add("mobile-nav-ready");

  const closeMenu = () => {
    header.classList.remove("mobile-nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  const mobileViewport = window.matchMedia("(max-width: 960px)");
  const dropdowns = navigation.querySelectorAll(".nav-dropdown");
  const closeDropdown = (dropdown) => {
    const trigger = dropdown.querySelector(".nav-dropdown-trigger");
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    dropdown.classList.remove("is-open", "is-hover");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (menu) menu.hidden = true;
  };

  dropdowns.forEach((dropdown, dropdownIndex) => {
    const trigger = dropdown.querySelector(".nav-dropdown-trigger");
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    if (!trigger || !menu) return;
    if (!menu.id) menu.id = `navigation-submenu-${index + 1}-${dropdownIndex + 1}`;
    trigger.setAttribute("aria-controls", menu.id);
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;

    const setOpen = (open, hover = false) => {
      dropdown.classList.toggle(hover ? "is-hover" : "is-open", open);
      if (!open && hover) dropdown.classList.remove("is-open");
      if (!open && !hover) dropdown.classList.remove("is-hover");
      const expanded = dropdown.classList.contains("is-open") || dropdown.classList.contains("is-hover");
      trigger.setAttribute("aria-expanded", String(expanded));
      menu.hidden = !expanded;
    };

    dropdown.addEventListener("mouseenter", () => {
      if (!mobileViewport.matches) setOpen(true, true);
    });
    dropdown.addEventListener("mouseleave", () => {
      if (!dropdown.contains(document.activeElement) && !dropdown.classList.contains("is-open")) {
        setOpen(false, true);
      }
    });
    dropdown.addEventListener("focusin", () => {
      if (!mobileViewport.matches) setOpen(true, true);
    });
    dropdown.addEventListener("focusout", (event) => {
      if (
        !dropdown.contains(event.relatedTarget) &&
        !dropdown.classList.contains("is-open")
      ) {
        setOpen(false, true);
      }
    });
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      if (expanded) closeDropdown(dropdown);
      else setOpen(true);
    });
    dropdown.querySelectorAll(".nav-dropdown-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdown(dropdown);
        closeMenu();
      });
    });
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) closeDropdown(dropdown);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && dropdown.classList.contains("is-open")) {
        closeDropdown(dropdown);
        trigger.focus();
      }
    });
    mobileViewport.addEventListener("change", () => closeDropdown(dropdown));
  });

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
    navigation.querySelector("a[href]")?.focus();
  });

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && !link.classList.contains("nav-dropdown-trigger")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      header.classList.contains("mobile-nav-open") &&
      (event.target === header || !header.contains(event.target))
    ) {
      closeMenu();
    }
  });

  document.addEventListener("focusin", (event) => {
    if (
      header.classList.contains("mobile-nav-open") &&
      !header.contains(event.target)
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
