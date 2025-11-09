document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("viewport");
  const home = document.getElementById("home");
  const body = document.body;

  const HOME_ZOOM = 3.5;
  const SECTION_ZOOM = 2.2;

  viewport.style.transformOrigin = "0 0";

  // --- Calcule la position d'une section dans le repère du viewport ---
  function getOffsetInContainer(el, container) {
    let x = 0, y = 0;
    let node = el;
    while (node && node !== container) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent;
    }
    return {
      x,
      y,
      w: el.offsetWidth,
      h: el.offsetHeight
    };
  }

  // --- Centre la caméra sur une section avec un zoom donné ---
  function centerOn(el, z) {
    const { x, y, w, h } = getOffsetInContainer(el, viewport);
    const x0 = x + w / 2;
    const y0 = y + h / 2;

    const cx = viewport.clientWidth / 2;
    const cy = viewport.clientHeight / 2;

    const tx = cx - z * x0;
    const ty = cy - z * y0;

    viewport.style.transform = `translate(${tx}px, ${ty}px) scale(${z})`;
    
    if (el === document.querySelector("main") || el.id === "home") {
      body.classList.add('hide-tabs');
    } else {
      body.classList.remove('hide-tabs');
    }
  }

  let currentTarget = home;
  let currentZoom = HOME_ZOOM;

window.addEventListener("load", () => {
  const main = document.querySelector("main"); // ton conteneur global

  requestAnimationFrame(() => {
    centerOn(main, HOME_ZOOM);
  });
});

// --- 2️⃣ Navigation entre les sections ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const main = document.querySelector("main");
    const target = document.getElementById(id);
    if (!target) return;

    let z, targetEl;
    if (id === "home") {
      targetEl = main;          // <-- on centre sur le conteneur global
      z = HOME_ZOOM;
    } else {
      targetEl = target;
      z = SECTION_ZOOM;
    }

    centerOn(targetEl, z);
    currentTarget = targetEl;
    currentZoom = z;
    history.replaceState(null, "", `#${id}`);
  });
});

  // --- 3️⃣ Recentrage au redimensionnement ---
  window.addEventListener("resize", () => {
    centerOn(currentTarget, currentZoom);
  });
});


document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const presentations = document.querySelectorAll(".presentation-contenu");

    // Close presentation when clicking outside
    document.addEventListener('click', function(event) {
        let isClickInsideCard = false;
        cards.forEach(card => {
            if (card.contains(event.target)) {
                isClickInsideCard = true;
            }
        });

        let isClickInsidePresentation = false;
        presentations.forEach(presentation => {
            if (presentation.contains(event.target)) {
                isClickInsidePresentation = true;
            }
        });

        if (!isClickInsideCard && !isClickInsidePresentation) {
            presentations.forEach(p => p.classList.remove('active'));
        }
    });

    cards.forEach((card, index) => {
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            const isActive = presentations[index].classList.contains('active');
            presentations.forEach(p => p.classList.remove("active"));
            if (!isActive) {
                presentations[index].classList.add("active");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const events = document.querySelectorAll("#parcours .event");
  const infos = document.querySelectorAll("#parcours .info-event");

  // Masquer toutes les divs au départ
  infos.forEach(info => info.style.display = "none");

  events.forEach(event => {
    event.addEventListener("click", () => {
      // Cacher toutes les divs
      infos.forEach(info => info.style.display = "none");

      // Trouver la div ciblée
      const targetId = event.dataset.target;
      const targetDiv = document.getElementById(targetId);

      if (targetDiv) {
        targetDiv.style.display = "block";
        targetDiv.classList.add("show");
      }
    });
  });
});
