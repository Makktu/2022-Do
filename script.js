import { months, examplesTodo } from "./data.js";

function createNew() {
    console.log("yep");
}

function displayList(todoList) {
    for (let entry of todoList) {
        displayTodos.innerHTML += `    
        <br><div class="todo-item">
        <div class="date-todo">${entry.date}</div>
        <div class="the-todo">${entry.content}</div>
        <div class="edit-btn" id="${entry.entry}">✍️</div>
        </div>   
        `;
    }
}

function sortDates() {
    let tempToDos = todoList;

    let theYear;
    let theMonth;
    let theDay;

    for (let entry of todoList) {
        theYear = +entry.date.substring(entry.date.length - 4);
        entry.year = theYear;
    }

    tempToDos.sort(function (a, b) {
        return a.year - b.year;
    });

    for (let entry of tempToDos) {
        theMonth = entry.date.split(" ")[1];
        let count = 0;
        for (let month of months) {
            if (theMonth == month) {
                entry.month = months[count + 1];
                break;
            }
            count++;
        }
    }

    for (let entry of tempToDos) {
        theDay = +entry.date.split(" ")[0];
        entry.day = theDay;
    }

    tempToDos
        .sort(function (a, b) {
            return a.year - b.year;
        })
        .sort(function (a, b) {
            if (a.year - b.year) return;
            return a.month - b.month;
        })
        .sort(function (a, b) {
            if (a.month !== b.month) return;
            return a.day - b.day;
        });

    console.log(tempToDos);

    todoList = tempToDos;
    return todoList;
}

const displayTodos = document.querySelector(".todo-display");
const createBtn = document.querySelector(".create-new");
createBtn.addEventListener("click", createNew);

let todoList = examplesTodo;

sortDates();
displayList(todoList);

const editBtns = document.querySelectorAll(".edit-btn");

editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        console.log(e.target.id);
    });
});

const modal = document.querySelector("#modal");

const dateToDo = document.getElementById("dateToDo");
const saveBtn = document.querySelector(".btn-save");
const theToDo = document.querySelector(".the-todo");

// const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

createBtn.addEventListener("click", () => {
    let todaysDate =
        `${new Date().getDate()} ` +
        `${new Date().toLocaleString("default", { month: "long" })} ` +
        `${new Date().getFullYear()}` +
        "";
    modal.showModal();
    theToDo.value = "";
    dateToDo.textContent = todaysDate;
});

closeModal.addEventListener("click", () => {
    modal.close();
});

saveBtn.addEventListener("click", () => {
    let toDoText = theToDo.value;
    console.log(toDoText);
    // add date and content to the object array
    // and call refreshed display
});
