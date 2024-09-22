// import editIcon from "./assets/edit-icon.svg";
// import deleteIcon from "./assets/delete-icon.svg";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

class TodoList {
  private Tasks: Task[] = [];

  //Add Task to todolist
  addTask(todo: Task) {
    this.Tasks.push(todo);
  }
  editTask() {}

  //Remove Task by id
  removeTask(id: number) {
    this.Tasks = this.Tasks.filter((todo) => todo.id !== id);
  }
  // returns the Tasks array.
  getTask() {
    return this.Tasks;
  }
}

class TodoListUI {
  private todoList: TodoList;

  constructor(todoList: TodoList) {
    this.todoList = todoList;
  }
  displayTasks() {
    const todoListElement = document.getElementById("list_items")!;
    todoListElement.innerHTML = "";

    this.todoList.getTask().forEach((todo) => {
      const todoElement = document.createElement("li");

      todoElement.classList.add("item");
      todoElement.innerHTML = `<div class="left_task">
              <input type="checkbox" ${
                todo.completed ? "checked" : ""
              } id="task1" class="checkbox" />
              <label for="task1" class="task-label"></label>
              <p class="strikethrough">
               ${todo.text}
              </p>
            </div>
            <div class="right_icons">
              <button aria-label="Edit task">
                <img src="../public/assets/edit-icon.svg" alt="Edit Icon">
              </button>
              <button 
              class="remove-todo" data-id="${todo.id}">
                <img src="../public/assets/delete-icon.svg" alt="Delete Icon">
              </button>


            </div>`;

      // Attach the remove event listener to the remove button
      const removeBtn = todoElement.querySelector(".remove-todo")!;
      removeBtn.addEventListener("click", () => {
        const id = parseInt(removeBtn.getAttribute("data-id")!);
        this.removeTodoById(id);
      });
      todoListElement.appendChild(todoElement);
    });
  }
  // this method adds a new task to the todoList object and updates the user interface to display the new task.
  addTodo() {
    const newTodoInput = document.getElementById(
      "input_task"
    ) as HTMLInputElement;
    const newTodoText = newTodoInput.value.trim();

    if (newTodoText) {
      const newTodo: Task = {
        id: Date.now(),
        text: newTodoText,
        completed: false,
      };

      this.todoList.addTask(newTodo);
      this.displayTasks();
      newTodoInput.value = "";
    }
  }
  //remove a task with id
  removeTodoById(id: number) {
    this.todoList.removeTask(id);
    this.displayTasks();
  }

  //event listeners to the HTML elements in the user interface to respond to user interactions.
  addEvent() {
    document
      .getElementById("add_btn")!
      .addEventListener("click", () => this.addTodo());

    // document.addEventListener("click", (event) => {
    //   const target = event.target as HTMLElement;

    //   if (target.matches(".remove-todo")) {
    //     const id = parseInt(target.getAttribute("data-id")!);
    //     this.removeTodoById(id);
    //   }
    // });
  }
}

const todoList = new TodoList();
const ui = new TodoListUI(todoList);

ui.displayTasks();
ui.addEvent();
