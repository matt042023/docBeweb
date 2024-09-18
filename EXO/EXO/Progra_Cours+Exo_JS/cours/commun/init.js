/* globals enonces,document */

// On récupère les blocs d'énoncés dans un tableau
{
    let numeroEnonce = 0;
    let enonce;
    do {
        enonce = document.getElementById(`enonce-${numeroEnonce}`);
        if (enonce !== null) {
            enonces.liste.push(enonce);
            numeroEnonce += 1;
        }
    } while (enonce);
}

// On stockera chaque appel à console.log dans ce tableau
const historiqueConsole = [];

// On initialise le statut des énoncés
function initialiserEnonces() {
    enonces.liste.forEach((enonce, i) => {
        enonces.definirAttente(enonces.liste[i]);
    });
}
initialiserEnonces();

/* eslint-disable no-console */
// On intercepte les appels vers console.log()
const proxyDeConsole = new Proxy(console.log, {
    apply(cible, leThis, listeArgs) {
        historiqueConsole.push(...listeArgs);
    },
});

// On stocke l'ancienne méthode log() pour la réutiliser plus tard pour déboguer
/* eslint-disable-next-line no-unused-vars */
const fonctionConsoleLog = console.log;
console.log = proxyDeConsole;