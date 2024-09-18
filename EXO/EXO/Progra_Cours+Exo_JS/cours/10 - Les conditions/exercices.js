/*
 * Tapez votre code sous chacun des commentaires.
 * Vous devez faire les exercices dans l'ordre !
 *
 
 *
 * Merci et bon courage ! 🤘
 */

/*****************************************************************************
 *          📣 OYEZ OYEZ BRAVES DÉVELOPPEURS ET DÉVELOPPEUSES ! 📣            *
 *****************************************************************************
 *
 * Pour faire ces exercices, lisez attentivement les instructions suivantes.
 *
 * Pour tester votre code, j'utilise des fonctions (qu'on verra bientôt dans
 * le cours ;-) !). Leur déclaration ressemble à ça :
 * 
 * function nomFonction(variable1, variable2) {
 *   ...
 * }
 * 
 * Ne supprimez pas ces fonctions ! Ne supprimez pas non plus l'accolade
 * fermante du bloc d'instructions de ces fonctions.
 * 
 * Insérez votre code à l'intérieur des fonctions, et tout ira bien !
 * 
 * Lisez tous les commentaires partout, merci ! 👍
 */

// J'ai déclaré pour vous quelques variables sur les différentes limites des
// manèges. Vous pouvez les utiliser (ou pas) dans tous les exercices !
// Si vous voulez les utilisez, ne commentez pas les lignes ci-dessous.
let limiteAge = 18;
let limitePoids = 120;
let limiteAgeEnfant = 12;
let limitePoidsEnfant = 50;

// Exercice 0
function exercice0(ageDuClient, poidsDuClient) { // Ne supprimez/commentez pas cette ligne

    // <===== VOTRE CODE ICI: Insérez/modifiez le code à partir d'ici =====>
    // Utilisez les variables ageDuClient, poidsDuClient, limiteAge, et
    // limitePoids pour construire vos conditions

    // Décommentez le code de Enzo ci-dessous, remplacez les "??" par une expression valide
    if (ageDuClient >= limiteAge && poidsDuClient < limitePoids ) {
      console.log("Vous pouvez monter dans ce manège");
    } else {
       console.log("Vous ne pouvez pas monter dans ce manège");
    }

    // <===== FIN DE VOTRE CODE CI-DESSUS =====>

} // Ne supprimez pas cette accolade fermante



// Exercice 1
function exercice1(ageDuClient, poidsDuClient) { // Ne supprimez/commentez pas cette ligne

    // <===== VOTRE CODE ICI: Insérez/modifiez le code à partir d'ici =====>
    // Utilisez les variables ageDuClient, poidsDuClient, limiteAgeEnfant, et
    // limitePoidsEnfant pour construire vos conditions
    if (ageDuClient <= limiteAgeEnfant || poidsDuClient < limitePoidsEnfant ) {
        console.log("Bienvenue dans ce nouveau manège pour les enfants !");
      } else {
        console.log("Désolé mais tu es trop grand pour monter dans ce manège.")
      }
   

    // <===== FIN DE VOTRE CODE CI-DESSUS =====>

} // Ne supprimez pas cette accolade fermante



// Exercice 2
function exercice2(ageDuClient, poidsDuClient) { // Ne supprimez/commentez pas cette ligne

    // <===== VOTRE CODE ICI: Insérez/modifiez le code à partir d'ici =====>
    if (poidsDuClient >= limitePoids && ageDuClient >= limiteAge ){
        console.log("Vous ne pouvez pas monter : les sièges ne supporteraient pas votre poids.");
      }else if(ageDuClient < limiteAge && poidsDuClient < limitePoids){
        console.log("Vous ne pouvez pas monter : ce manège est réservé aux adultes.");
      }else if(ageDuClient < limiteAge && poidsDuClient >= limitePoids){
        console.log("Vous devriez vite arrêter de manger des frites !");
      }else{
        console.log("Bienvenue dans le manège !");
      };


} // Ne supprimez pas cette accolade fermante



// Chassez le bogue ! 0
function exercice3() { // Ne supprimez/commentez pas cette ligne

    // <===== VOTRE CODE ICI: Insérez/modifiez le code à partir d'ici =====>

    // Décommentez le code de Enzo ci-dessous
    let zero = 0;
    if (zero == 0) {
       console.log("La variable zero vaut bien zéro");
    } else {
       console.log("Oops ! Il semble y avoir un bogue !");
    }

    // <===== FIN DE VOTRE CODE CI-DESSUS =====>

} // Ne supprimez pas cette accolade fermante



// Chassez le bogue ! 1
function exercice4() { // Ne supprimez/commentez pas cette ligne

    // <===== VOTRE CODE ICI: Insérez/modifiez le code à partir d'ici =====>

    // Décommentez le code de Enzo ci-dessous
     let reponse = 42;
     let condition = false;

     if (condition){
       condition = true;
       reponse = 1337;}

     console.log("La réponse est " + reponse);

    // <===== FIN DE VOTRE CODE CI-DESSUS =====>

} // Ne supprimez pas cette accolade fermante


// Chassez le bogue ! 2
function exercice5() { // Ne supprimez/commentez pas cette ligne

    // <===== VOTRE CODE ICI: Insérez/modifiez le code à partir d'ici =====>

    // Décommentez le code de Enzo ci-dessous
    let reponse = 1337;
    let condition = false;

    if (condition){ reponse = 42; console.log("La réponse est toujours " + reponse)};
    console.log("Seule cette ligne devrait s'afficher");

    // <===== FIN DE VOTRE CODE CI-DESSUS =====>

} // Ne supprimez pas cette accolade fermante