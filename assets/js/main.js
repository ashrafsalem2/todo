//inputs
var todoInput = document.getElementById("taskInput");
var addBtn = document.getElementById("AddBtn");
var updateBtn = document.getElementById("updateBtn");
var tasksContainer = document.getElementById("tasksContainer");
var searchInput = document.getElementById("searchInput");
var isUpdate = false;
var currentindex = 0;

//list
var todoList = [];

//reg
const regEx = /^\w{3,}$/;

//functions
/**set todo list to be the one in local strage if exist */
if (localStorage.getItem("todoList") !== null) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
}
display(todoList);
/**
 *to check the input before insert
 * @param {todo input } todoInput
 */
function startRegex(todoInput) {
  if (!regEx.test(todoInput.value)) {
    todoInput.classList.add("is-invalid");
    todoInput.classList.remove("is-valid");
  } else {
    todoInput.classList.add("is-valid");
    todoInput.classList.remove("is-invalid");
  }
}
/**
 * adding new todo item
 */
function createTask() {
  var todo = {
    item: todoInput.value,
  };

  todoList.push(todo);

  localStorage.setItem("todoList", JSON.stringify(todoList));
  display(JSON.parse(localStorage.getItem("todoList")));

  clearInput();
}

/**
 * empty filed
 */
function clearInput() {
  todoInput.value = "";
}
/**
 * display todo list
 */
function display(todoList) {
  var list = "";
  for (var i = 0; i < todoList.length; i++) {
    list += `
            <tr>
                <td>${i}</td>
                <td>${todoList[i].item}</td>
                <td>
                    <button class="btn btn-outline-info" onclick="updateTodo(${i})">Edit</button>
                    <button class="btn btn-outline-danger" onclick="deleteTodo(${i})">Delete</button>
                </td>
            </tr>
        `;
  }

  tasksContainer.innerHTML = list;
}
/**
 * toggle the btn to show
 */
function toggoleBtn() {
  if (isUpdate) {
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
  } else {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
}
/**
 * prepare to update
 * update and appear the update button
 * @param {todo index} index
 */
function updateTodo(index) {
  //first shoe update btn
  isUpdate = true;
  toggoleBtn();


  // show element
  todoInput.value = todoList[index].item;

  //get current index
  currentindex = index;

  //update
  updateCurrentTask();

  // set flage to false
  isUpdate = false;
}

/**
 * the upfate portion
 */
function updateCurrentTask() {
  todoList[currentindex].item = todoInput.value;

  //update todolist at local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  // display the list
  display(JSON.parse(localStorage.getItem("todoList")));

  // clear search if exist
  searchInput.value = "";

  clearInput();
}

/**
 * delete todo item
 * @param {todo list index} index
 */
function deleteTodo(index) {
  //done: ask first using sweet alert
  swal
    .fire({
      title: "Are you sure?",
      text: "Some text.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes!",
      cancelButtonText: "No.",
    })
    .then((result) => {
      if (result.value) {
        todoList.splice(index, 1);
        //update todolist at local storage
        localStorage.setItem("todoList", JSON.stringify(todoList));

        // display the list
        display(JSON.parse(localStorage.getItem("todoList")));

        // clear search if exist
        searchInput.value = "";
      } else {
        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
      }
    });
}

/**
 * search function
 */
function startSearch(searchInput) {
  var list = "";

  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].item.includes(searchInput.value)) {
      list += `
            <tr>
                <td>${i}</td>
                <td>${todoList[i].item}</td>
                <td>
                    <button class="btn btn-outline-info" onclick="updateTodo(${i})">Edit</button>
                    <button class="btn btn-outline-danger" onclick="deleteTodo(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
  }

  tasksContainer.innerHTML = list;
}
