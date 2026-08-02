(() => {
  const clockEl = document.getElementById("hud-clock");
  const neuralBtn = document.getElementById("neural-btn");
  const bootOverlay = document.getElementById("boot-overlay");
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = document.querySelectorAll("#link, #hierarchy, #chrome, #districts");
  const loreBlocks = document.querySelectorAll(".lore-block");
  const statusCorner = document.querySelector(".corner--tr");

  /* HUD clock */
  const tickClock = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
  };
  tickClock();
  setInterval(tickClock, 1000);

  /* Neural Link jack-in */
  let linking = false;

  const setStatus = (line) => {
    if (!statusCorner) return;
    const first = statusCorner.querySelector("span");
    if (first) first.textContent = line;
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const jackIn = async () => {
    if (linking) return;
    linking = true;
    document.body.classList.add("is-linking");
    setStatus("STATUS: LINKING");

    bootOverlay.hidden = false;
    // Force reflow so transition applies
    void bootOverlay.offsetWidth;
    bootOverlay.classList.add("is-on");

    await sleep(2200);

    document.body.classList.add("is-linked");
    document.body.classList.remove("is-linking");
    setStatus("STATUS: ONLINE");

    bootOverlay.classList.remove("is-on");
    await sleep(350);
    bootOverlay.hidden = true;

    document.getElementById("world")?.scrollIntoView({ behavior: "smooth", block: "start" });
    linking = false;
  };

  neuralBtn?.addEventListener("click", jackIn);

  /* Keyboard: Enter / Space on focused button already works; also N key shortcut */
  window.addEventListener("keydown", (e) => {
    if (e.key === "n" || e.key === "N") {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      jackIn();
    }
  });

  /* Lore reveal */
  if ("IntersectionObserver" in window) {
    const loreObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            loreObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.22 }
    );
    loreBlocks.forEach((block) => loreObserver.observe(block));

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("is-active", href === `#${id}` || (id === "world" && href === "#hierarchy"));
          });
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  } else {
    loreBlocks.forEach((block) => block.classList.add("is-visible"));
  }

  /* Subtle cursor HUD parallax on neural stage */
  const stage = document.querySelector(".neural-stage");
  if (stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const rings = stage.querySelector(".hud-rings");
    stage.addEventListener("pointermove", (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (rings) {
        rings.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
    });
    stage.addEventListener("pointerleave", () => {
      if (rings) rings.style.transform = "";
    });
  }
})();
