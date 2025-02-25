// Durée de l'apparition et disparition de l'image en millisecondes
const duree = 300;

// Création de la balise <div id="grande"> en fin de page
const divgrande = document.createElement("div");
divgrande.id = "grande";
document.body.appendChild(divgrande);

// Application de la durée de transition
divgrande.style.transitionDuration = duree + "ms";

// Si clic sur les vignettes
function clic_vignettes() {
    // On récupère la source de la vignette sur laquelle l'utilisateur a cliqué
    let source_vignette = this.getAttributeNode("src").value;
    // On récupère le nom de la grande image à partir de la source de la vignette (retrait des 16 premiers caractères : "images/vignette-")
    let nom_grande = source_vignette.substr(16);
    // On insère la grande image dans la balise div
    divgrande.innerHTML = "<img src='images/" + nom_grande + "'>";
    // Div au premier plan
    divgrande.style.zIndex = 1;
    // Div opaque (progressivement grâce à la propriété CSS transition)
    divgrande.style.opacity = 1;
    // Curseur avec la petite main pour inviter au clic de sortie
    divgrande.style.cursor = 'pointer';
    // On greffe un évènement click pour fermer la grande image
    divgrande.addEventListener("click", clic_grande);
}

// Si clic sur la grande image
function clic_grande() {
    // On enlève l'écoute du click sur la grande image pour éviter les bugs
    divgrande.removeEventListener("click", clic_grande);
    // Transparence progressive
    divgrande.style.opacity = 0;
    // Une fois que l'image est transparente, on masque le div en arrière plan
    setTimeout(masque_grande, duree);
}

// Div en arrière plan et curseur normal
function masque_grande() {
    divgrande.style.zIndex = -1;
    divgrande.style.cursor = 'initial';
}

// On lance l'écoute des clics sur les vignettes
const vignettes = document.querySelectorAll("img[src*=vignette]");

vignettes.forEach(function (element) {
    element.addEventListener("click", clic_vignettes);
});