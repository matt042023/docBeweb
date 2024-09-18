// On récupère l'élément input
const champTexteNouvelleTache = document.getElementById("taskTextInput");
// On récupère le boutton
const boutonAjoutNouvelleTache = document.getElementById("addTaskButton");
// On récupère la div
const conteneurDesTaches = document.getElementById("taskList");
const boutonAfficherToutesLesTaches = document.getElementById("showAll");
const boutonAfficherTachesTerminees = document.getElementById("showCompleted");
const boutonAfficherTachesSupprimer = document.getElementById("showRemoved");
let monDiagrammeCamembert = null;
boutonAfficherToutesLesTaches.addEventListener("click", () => {
  Array.from(document.querySelectorAll("#taskList div")).forEach(
    (div) => (div.style.display = "block")
  );
});
boutonAfficherTachesTerminees.addEventListener("click", () => {
  Array.from(document.querySelectorAll("#taskList div")).forEach(
    (div) =>
      (div.style.display = div.classList.contains("completed")
        ? "block"
        : "none")
  );
});
boutonAfficherTachesSupprimer.addEventListener("click", () => {
  Array.from(document.querySelectorAll("#taskList div")).forEach(
    (div) =>
      (div.style.display = div.classList.contains("remove") ? "block" : "none")
  );
});
// Sur le bouton tu attend le click
boutonAjoutNouvelleTache.addEventListener("click", () => {
  // Tu récupère dans l'input la valeur rentré dans l'input
  const texteNouvelleTache = champTexteNouvelleTache.value;
  console.log(texteNouvelleTache);
  // Tu vérifie que la valeur n'est pas vide
  if (texteNouvelleTache === "") return;
  // Tu me crée une nouvelle div
  const elementDivPourLaNouvelleTache = document.createElement("div");
  // Dans cette div tu me met le text qui il y a dans l'input
  elementDivPourLaNouvelleTache.textContent = texteNouvelleTache;
  // Tu me met cette div avec ce text dans la div qui dois rassembler toutes les taches
  conteneurDesTaches.appendChild(elementDivPourLaNouvelleTache);
  // tu vide la valeur de l'input
  champTexteNouvelleTache.value = "";
  ajouterEvenementsPourElementTache(elementDivPourLaNouvelleTache);
  enregistrerTachesDansLocalStorage();
});
function enregistrerTachesDansLocalStorage() {
  const tachesAEnregistrer = Array.from(
    document.querySelectorAll("#taskList div")
  ).map((elementDivDesTachesCreer) => ({
    text: elementDivDesTachesCreer.textContent,
    class: elementDivDesTachesCreer.className,
  }));
  localStorage.setItem("tachesEnregistrer", JSON.stringify(tachesAEnregistrer));
  mettreAJourDiagrammeCamembert();
}
function chargerTachesDepuisLocalStorage() {
  const tachesSauvegarder = JSON.parse(
    localStorage.getItem("tachesEnregistrer") || "[]"
  );
  tachesSauvegarder.forEach((objetTaches) => {
    const elementDivPourLaTachesSauvegarder = document.createElement("div");
    elementDivPourLaTachesSauvegarder.textContent = objetTaches.text;
    elementDivPourLaTachesSauvegarder.className = objetTaches.class;
    ajouterEvenementsPourElementTache(elementDivPourLaTachesSauvegarder);
    conteneurDesTaches.appendChild(elementDivPourLaTachesSauvegarder);
  });
}
function ajouterEvenementsPourElementTache(elementDivPourTache) {
  elementDivPourTache.addEventListener("click", () => {
    // rajouter une class dans l'élément qui s'appelle completed
    if (elementDivPourTache.classList.contains("remove"))
      elementDivPourTache.classList.remove("remove");
    else if (elementDivPourTache.classList.contains("inCourse")) {
      elementDivPourTache.classList.remove("inCourse");
    } else if (elementDivPourTache.classList.contains("completed")) {
      elementDivPourTache.classList.remove("completed");
      elementDivPourTache.classList.toggle("inCourse");
    }
    elementDivPourTache.classList.toggle("completed");
    enregistrerTachesDansLocalStorage();
  });
  // au click droit sur l'élément
  elementDivPourTache.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (elementDivPourTache.classList.contains("completed"))
      elementDivPourTache.classList.remove("completed");
    else if (elementDivPourTache.classList.contains("inCourse")) {
      elementDivPourTache.classList.remove("inCourse");
    }
    elementDivPourTache.classList.toggle("remove");
    enregistrerTachesDansLocalStorage();
  });
  elementDivPourTache.addEventListener("dblclick", () => {
    const tacheModifiee = prompt(
      "Modifier la tache: ",
      taskElement.textContent
    );
    if (tacheModifiee !== "") {
      elementDivPourTache.textContent = tacheModifiee;
    }
    enregistrerTachesDansLocalStorage();
  });
}
function mettreAJourDiagrammeCamembert() {
  const toutesLesTaches = Array.from(
    document.querySelectorAll("#taskList div")
  );
  const tachesTerminees = toutesLesTaches.filter((tache) =>
    tache.classList.contains("completed")
  ).length;
  const tachesSupprimer = toutesLesTaches.filter((tache) =>
    tache.classList.contains("remove")
  ).length;
  const tachesEnCours = toutesLesTaches.filter((tache) =>
    tache.classList.contains("inCourse")
  ).length;
  const ctx = document.getElementById("monDiagrammeCamembert").getContext("2d");
  const donnéesDiagramme = {
    labels: ["Tâches terminées", "Tâches en cours", "Tâches supprimer"],
    datasets: [
      {
        data: [tachesTerminees, tachesEnCours, tachesSupprimer],
        backgroundColor: ["green", "yellow", "red"],
      },
    ],
  };
  if (monDiagrammeCamembert === null) {
    monDiagrammeCamembert = new Chart(ctx, {
      type: "doughnut",
      data: donnéesDiagramme,
    });
  } else {
    monDiagrammeCamembert.data = donnéesDiagramme;
  }
  monDiagrammeCamembert.update();
}
chargerTachesDepuisLocalStorage();