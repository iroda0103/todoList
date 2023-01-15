let inputTodo = document.getElementById("input_todo");
let addButton = document.getElementById("add-button");
let answers = new Array();

if (localStorage.getItem("answers")) {
  answers = JSON.parse(localStorage.getItem("answers"));
  console.log(JSON.parse(localStorage.getItem("answers")));
}
//Add TodoListItem
function addTodoItem(answers) {
  inputTodo.addEventListener("change", (e) => {
    e.preventDefault();
    // if (localStorage.getItem("answers")) {
    //   answers = JSON.parse(localStorage.getItem("answers"));
    // }
    answers.unshift(e.target.value);
    localStorage.setItem("answers", JSON.stringify(answers));
    renderTodoListItem(answers);
  });
}
addTodoItem(answers);

//Render TodoList
let todoList = document.querySelector(".todo-list");
let todoListTemplate = document.getElementById("todo-list-template").content;
function renderTodoListItem(answers) {
  todoList.innerHTML = "";
  answers.forEach((element, index) => {
    let todoLi = todoListTemplate.cloneNode(true);
    todoLi.querySelector(".todo_item__span").innerText = element;
    let trashSpan = todoLi.querySelector(".trash");
    trashSpan.addEventListener("click", () => {
      window.editableProductId = index;
    });
    todoList.append(todoLi);
    console.log(element);
  });
  let answersNumber = document.querySelector(".answers-number");
  answersNumber.innerHTML = answers.length;
}
renderTodoListItem(answers);

//Clear TodoList
function clearTodoList(answers) {
  let todoListClear = document.querySelector(".todo_list__clear");
  todoListClear.addEventListener("click", () => {
    answers = new Array();
    localStorage.setItem("answers", JSON.stringify(answers));
    console.log("clear");
    renderTodoListItem(answers);
  });
}
clearTodoList(answers);

//Trash
// todoList.addEventListener("click", (e) => {
//   console.log(e.target);
// });
function trashed(answers) {
  todoList.addEventListener("click", (e) => {
    answers.forEach((element, index) => {
      if (window.editableProductId == index) {
        let newanswers = answers.splice(index, 1);
        localStorage.setItem("answers", JSON.stringify(answers));
        console.log(answers);
        renderTodoListItem(answers);
      }
    });
  });
}
trashed(answers);
