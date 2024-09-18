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
ajouterReponse([
    "===[ Destinataire ]===",
    "Enzo REDOCEMIA",
    "21 rue du bloc d'instructions",
    "1337 POINT-VIRGULE",
]);

// Exercice 1
function testerExercice1() {
    let valeursTest = [
        [42, "420042"],
        [5000, "PR5000"],
        [6999, "PR6999"],
        [7000, "427000"],
        [1683, "421683"],
    ];
    for (let i = 0; i < valeursTest.length; i++) {
        let [valeurTest, valeurAttendue] = valeursTest[i];
        let valeurRecue = formaterNumeroClient(valeurTest);
        if (valeurRecue === valeurAttendue) {
            enonces.definirSucces(enonces.liste[1], valeurRecue);
        } else {
            valeurAttendue += `<br /><br />... pour le numéro client <code>${valeurTest}</code>`;
            const reponseComplete = { valeurRecue, valeurAttendue };
            enonces.definirEchec(enonces.liste[1], reponseComplete);
            break;
        }
    };
}
idExercice++;

// Exercice 2
ajouterReponse([
    "===[ Notre adresse ]===",
    "MagiciensDuCode",
    "42 avenue de l'accolade ouvrante",
    "1337 POINT-VIRGULE",
    "",
    "===[ Destinataire ]===",
    "Enzo REDOCEMIA",
    "21 rue du bloc d'instructions",
    "1337 POINT-VIRGULE",
    "",
    "===[ Vos références ]===",
    "N° de client : PR5842",
]);

// Exercice 3
ajouterReponse([
    "      **              **      **",
    "    **               **         **",
    "  **                **            **",
    "**                 **               **",
    "  **              **              **",
    "    **           **             **",
    "      **        **            **",
]);

// Chassez le bogue ! 0
ajouterReponse([
    "     *",
    "    *o*",
    "   *o*o*",
    "  *o*o*o*",
    " *o*o*o*o*",
    "*o*o*o*o*o*",
    "    ***",
    "    ***",
    "    ***",
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
                    if (reponseAttendue.idExercice === 0) testerExercice1();
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