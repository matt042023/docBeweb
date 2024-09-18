/* globals enonces,initialiserEnonces,historiqueConsole,fonctionConsoleLog,formaterPourLeHtml */
/* globals window,limiteAge,limitePoids,limiteAgeEnfant,limitePoidsEnfant */

const reponsesEnonces = [];
let idExercice = 0;

function ajouterReponse(reponse) {
    let nombreDeLignesReponse = 1;

    if (Array.isArray(reponse)) {
        nombreDeLignesReponse = reponse.length;
    }

    reponsesEnonces.push({
        idExercice,
        reponse,
        nombreDeLignesReponse,
    });

    idExercice++;
}

// Exercice 0
ajouterReponse(["Ma première fonction"]);

// Exercice 1
ajouterReponse([
    "===[ Notre adresse ]===",
    "MagiciensDuCode",
    "42 avenue de l'accolade ouvrante",
    "1337 POINT-VIRGULE",
]);

// Exercice 2
ajouterReponse([
    "N° de client : 420000",
    "N° de client : 420001",
    "N° de client : 420009",
    "N° de client : 420010",
    "N° de client : 420099",
    "N° de client : 420100",
    "N° de client : 420999",
    "N° de client : 421000",
    "N° de client : 429999",
])

// Exercice 3
ajouterReponse([
    "===[ Notre adresse ]===",
    "MagiciensDuCode",
    "42 avenue de l'accolade ouvrante",
    "",
    "===[ Vos références ]===",
    "N° de client : 421337",
]);

ajouterReponse([
    "*",
    "***",
    "*****",
    "*******",
    "*****",
    "***",
    "*",
]);


// On réutilise la fonction console.log de base sans le proxy (pour déboguer)
/* eslint-disable-next-line no-console */
console.log = fonctionConsoleLog;

switch (historiqueConsole.length) {
    case 0:
        initialiserEnonces();
        break;
    default:
        {
            let reponseAttendue = reponsesEnonces.shift();
            let valeurConsole = historiqueConsole.shift();

            while (valeurConsole !== undefined && reponseAttendue !== undefined) {
                // Il faut récupérer toutes les lignes de la console pour cet exercice
                let nombreDeLignesManquantes = reponseAttendue.nombreDeLignesReponse - 1;
                valeurConsole += '\n';
                while (nombreDeLignesManquantes--) {
                    let valeur = historiqueConsole.shift();
                    if (valeur !== undefined) {
                        // Si l'étudiant écrit plusieurs lignes d'un coup via \n ou les backticks
                        let lignesDistinctes = valeur.split("\n");
                        if (lignesDistinctes.length !== 1) {
                            // On retire d'autant le nombre de lignes manquantes
                            nombreDeLignesManquantes -= lignesDistinctes.length - 1;
                        }
                        valeurConsole += valeur + '\n';
                    }
                }
                let reponseMultiLigne = reponseAttendue.reponse.join('\n') + "\n";
                let exerciceReussi = valeurConsole === reponseMultiLigne;

                reponseMultiLigne = formaterPourLeHtml(reponseMultiLigne);

                if (exerciceReussi) {
                    enonces.definirSucces(enonces.liste[reponseAttendue.idExercice], reponseMultiLigne);
                } else {
                    const valeurRecue = formaterPourLeHtml(valeurConsole);
                    const reponseComplete = { valeurRecue, valeurAttendue: reponseMultiLigne };
                    enonces.definirEchec(enonces.liste[reponseAttendue.idExercice], reponseComplete);
                    break;
                }

                valeurConsole = historiqueConsole.shift();
                reponseAttendue = reponsesEnonces.shift();
            }
            break;
        }
}