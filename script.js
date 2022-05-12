import { months } from "./data.js";

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
    // make a copy of the ToDo list and work on it for safety's sake
    let tempToDos = todoList;

    let theYear;
    let theMonth;
    let theDay;
    // first sort by year, ascending order - get last 4 characters of .date, convert to number, and sort. Shuffle the tempArray back into

    for (let entry of todoList) {
        theYear = +entry.date.substring(entry.date.length - 4);
        entry.year = theYear;
    }

    tempToDos.sort(function (a, b) {
        return a.year - b.year;
    });

    // now do same for the month
    for (let entry of tempToDos) {
        theMonth = entry.date.split(" ")[1];
        console.log(theMonth[1]);
        let count = 0;
        for (let month of months) {
            if (theMonth == month) {
                entry.month = months[count + 1];
                break;
            }
            count++;
        }
    }
    // now the same for the days
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

let todoList = [
    {
        entry: 1,
        date: "12 May 2022",
        content: "Wash Car",
    },
    {
        entry: 2,
        date: "15 May 2022",
        content: "Pay bills",
    },
    {
        entry: 3,
        date: "31 May 2019",
        content: "Check council website for that thing",
    },
    {
        entry: 4,
        date: "2 June 2022",
        content: "Attend the match",
    },
    {
        entry: 5,
        date: "19 May 2022",
        content: "get Steve's birthday present",
    },
    {
        entry: 6,
        date: "2 June 1988",
        content: "Attend the match",
    },
    {
        entry: 7,
        date: "4 February 2023",
        content: "get Steve's birthday present",
    },

    {
        entry: 8,
        date: "22 November 2022",
        content: "Attend the match",
    },
    {
        entry: 9,
        date: "14 April 2025",
        content: "close bank accounts",
    },
    {
        entry: 10,
        date: "15 January 2023",
        content: "Kira's wedding",
    },
    {
        entry: 11,
        date: "10 March 2022",
        content: "paint shed",
    },
    {
        entry: 12,
        date: "1 June 2022",
        content: "paint house",
    },
];

sortDates();
displayList(todoList);

const editBtns = document.querySelectorAll(".edit-btn");

editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        console.log(e.target.id);
    });
});
