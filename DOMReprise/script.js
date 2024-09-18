const taskTextInput = document.getElementById('taskTextInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const showAll = document.getElementById('showAll');
const showCompleted = document.getElementById('showCompleted');
const showRemoved = document.getElementById('showRemoved');

showAll.addEventListener('click', () =>{
Array.from(document.querySelectorAll('#taskList div')).forEach(
    (div) => (div.style.display = 'block')
);
});


showCompleted.addEventListener('click', () => {
Array.from(document.querySelectorAll('#taskList div')).forEach(
    (div) => 
    (div.style.display = div.classList.contains("completed") ? "block" : "none")
);
});

showRemoved.addEventListener('click', () =>{
Array.from(document.querySelectorAll('#taskList div')).forEach(
    (div) => 
    (div.style.display = div.classList.contains("remove") ? "block" : "none")
);
});

addTaskButton.addEventListener("click", () => {
    const newTask = taskTextInput.value;
    if (newTask === "" ) return;

    const taskElement = document.createElement("div");

    taskElement.textContent = newTask;
    taskList.appendChild(taskElement);
    taskTextInput.value = "";

    addTaskEvents(taskElement);
    saveTasks();
});

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll("taskList div")).map(
        (divReturned) => ({
            text : divReturned.textContent,
            class : divReturned.className,
        })
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCamembert();
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach((objetTasks) => {
        const taskElement = document.createElement("div");
        taskElement.textContent = objetTasks.text;
        taskElement.className = objetTasks.class;
        addTaskEvents(taskElement);
        taskList.appendChild(taskElement);
    });
}

function addTaskEvents(taskElementDiv) {
    taskElementDiv.addEventListener("click", () => {
        if (taskElementDiv.classList.contains("remove"))
        taskElementDiv.classList.remove("remove");
    else if (taskElementDiv.classList.contains("inCourse")){
        taskElementDiv.classList.remove('inCourse')
    }    else if(taskElementDiv.contains('completed')){
        taskElementDiv.remove('completed');
        taskElementDiv.toggle('inCourse');
    }
    taskElementDiv.classList.toggle("completed");
    saveTasks();
    });

    taskElementDiv.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (taskElementDiv.classList.contains('completed'))
        taskElementDiv.classList.remove("completed");
    else if (taskElementDiv.classList.contains("inCourse")){
        taskElementDiv.classList.remove("inCourse");
    }
    taskElementDiv.classList.toggle('remove');
    saveTasks();
    });

    taskElementDiv.addEventListener("dblclick", () => {
        const updatedTask = prompt("Modifier la tache : ", taskElement.textContent);
        if(updatedTask !== "") {
            taskElementDiv.textContent = updatedTask;
        }
        saveTasks();
    });
}

function updateCamembert() {
    const taskAll = Array.from(document.querySelectorAll('#taskList div'));
    const taskCompleted = taskAll.filter((task) => 
    task.classList.contains('completed')).length;
    const taskremoved = taskAll.filter((task) => 
    task.classList.contains('remove')).length;
    const taskInCourse = taskAll.filter((task) =>
    task.classList.contains("inCourse")).length;

    const ctx = document.getElementById('diagrammeCamembert').getContext('2d');

    const donnéesDiagramme = {
        labels: ["Tâches Terminées", "Taches en cours", "Taches supprimees"],
        datasets: [
            {
                data: [taskCompleted, taskInCourse, taskremoved]
            },
        ],
    };

    if (diagrammeCamembert === null){
        diagrammeCamembert = new CharacterData(ctx, {
            type: "doughnut",
            data: donnéesDiagramme,
        });
    }else {
        diagrammeCamembert.data = donnéesDiagramme;
    }
    diagrammeCamembert.update();
}   

loadTasks();