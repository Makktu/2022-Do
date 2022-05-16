import { months, examplesTodo } from "./data.js";

function createNew(toDoText) {
    let todaysDate =
        `${new Date().getDate()} ` +
        `${new Date().toLocaleString("default", { month: "long" })} ` +
        `${new Date().getFullYear()}` +
        "";

    let newOne = Object.create(todoList[0]);

    newOne.entry = todoList.length + 1;
    newOne.date = todaysDate;
    newOne.content = toDoText;

    todoList.push(newOne);

    sortDates();
    displayList(todoList);
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

let todoList = examplesTodo;

sortDates();
displayList(todoList);

const editBtns = document.querySelectorAll(".edit-btn");

editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        console.log(e.target.id);
    });
});

const saveBtn = document.querySelector(".btn-save");

saveBtn.addEventListener("click", () => {
    let toDoText = document.getElementById("the-todo").value;
    document.getElementById("the-todo").value = "";
    if (toDoText) createNew(toDoText);
    // add date and content to the object array
    // and call refreshed display
});

// _______________

// let examplesTodo = [
//     {
//         entry: 1,
//         date: "12 May 2022",
//         content: "Wash Car",
//     },
//     {
//         entry: 2,
//         date: "15 May 2022",
//         content: "Pay bills",
//     },
//     {
//         entry: 3,
//         date: "31 May 2019",
//         content: "Check council website for that thing",
//     },
//     {
//         entry: 4,
//         date: "2 June 2022",
//         content: "Attend the match",
//     },
//     {
//         entry: 5,
//         date: "19 May 2022",
//         content: "get Steve's birthday present",
//     },
// ];
