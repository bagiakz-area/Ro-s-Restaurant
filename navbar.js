document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".nav-bar");
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileMenu = document.querySelector(".nav-mobile-menu");
  const mobileDrawer = document.querySelector(".nav-mobile-drawer");
  const closeTargets = document.querySelectorAll("[data-nav-close]");
  const navLinks = document.querySelectorAll('.nav-link-item[href^="#"]');
  const sections = [...document.querySelectorAll("section[id]")];

  const setMenuState = (isOpen) => {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    mobileMenu.classList.toggle("open", isOpen);
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  };

  hamburger?.addEventListener("click", () => {
    setMenuState(!mobileMenu?.classList.contains("open"));
  });

  closeTargets.forEach((target) => {
    target.addEventListener("click", () => setMenuState(false));
  });

  mobileDrawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  const updateNavbar = () => {
    const scrolled = window.scrollY > 24;
    navbar?.classList.toggle("scrolled", scrolled);

    const darkSection = document
      .elementFromPoint(
        window.innerWidth / 2,
        Math.min(120, window.innerHeight - 1),
      )
      ?.closest(".ex-offer, .container-fluid");
    navbar?.classList.toggle("dark-bg", Boolean(scrolled && darkSection));
  };

  const updateActiveLink = () => {
    const offset = window.innerHeight * 0.35;
    let currentId = sections[0]?.id;

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentId}`,
      );
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      updateNavbar();
      updateActiveLink();
    },
    { passive: true },
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) setMenuState(false);
    updateNavbar();
    updateGallery();
  });

  const track = document.querySelector(".gallery-track");
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  const prevButton = document.querySelector(".gallery-nav-prev");
  const nextButton = document.querySelector(".gallery-nav-next");
  let activeIndex = Math.min(1, galleryItems.length - 1);

  function updateGallery() {
    if (!track || galleryItems.length === 0) return;

    galleryItems.forEach((item, index) => {
      item.classList.toggle("active", index === activeIndex);
    });

    const activeItem = galleryItems[activeIndex];
    const wrapper = track.parentElement;
    if (!activeItem || !wrapper) return;

    requestAnimationFrame(() => {
      const wrapperCenter = wrapper.clientWidth / 2;
      const activeCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
      track.style.transform = `translateX(${wrapperCenter - activeCenter}px)`;
    });
  }

  const moveGallery = (direction) => {
    if (galleryItems.length === 0) return;
    activeIndex =
      (activeIndex + direction + galleryItems.length) % galleryItems.length;
    updateGallery();
  };

  prevButton?.addEventListener("click", () => moveGallery(-1));
  nextButton?.addEventListener("click", () => moveGallery(1));
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      activeIndex = index;
      updateGallery();
    });
  });

  updateNavbar();
  updateActiveLink();
  updateGallery();
});
