document.addEventListener("DOMContentLoaded", () => {
  // Désactive toute transition au chargement
  document.body.classList.add("not-ready");

  const viewport = document.getElementById("viewport");
  const home = document.getElementById("home");
  const HOME_ZOOM = 3.5;

  // Fonction pour centrer un élément avec un zoom donné
  function centerOn(element, zoom) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const moveX = (window.innerWidth / 2 - centerX) / window.innerWidth * 100;
    const moveY = (window.innerHeight / 2 - centerY) / window.innerHeight * 100;

    viewport.style.transform = `scale(${zoom}) translate(${moveX}%, ${moveY}%)`;
  }

  // Applique le centrage et le zoom immédiatement
  centerOn(home, HOME_ZOOM);

  // Réactive les transitions pour plus tard (facultatif)
  setTimeout(() => {
    document.body.classList.remove("not-ready");
  }, 0);
});

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const presentations = document.querySelectorAll(".presentation-contenu");

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            // Masquer toutes les présentations
            console.log("Carte cliquée :", index + 1);
            presentations.forEach(p => p.classList.remove("active"));

            // Afficher celle correspondant à la carte cliquée
            presentations[index].classList.add("active");
        });
    });
});