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