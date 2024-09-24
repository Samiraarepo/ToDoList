interface Task {
  id: number;
  text: string;
  completed: boolean;
}

class TodoList {
  private Tasks: Task[] = [];

  // Add Task to todolist
  addTask(todo: Task) {
    this.Tasks.push(todo);
  }

  editTask(id: number, newText: string) {
    const editTask = this.Tasks.find((todo) => todo.id === id);
    if (editTask) {
      editTask.text = newText;
    }
  }

  // Remove Task by id
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
    this.initEventListeners();
  }

  // Initialize event listeners for UI interactions
  private initEventListeners() {
    // Event listener for the "Add" button
    document
      .querySelector("#add_btn")!
      .addEventListener("click", () => this.addTodo());
  }

  // Updates the total number of tasks
  updateTaskCount() {
    const allTasks = document.querySelector("#all_tasks")!;
    const taskArr = this.todoList.getTask();
    allTasks.textContent = taskArr.length.toString();
  }

  updateCompletedCount() {
    // Filter tasks that are completed
    const doneTasks = document.querySelector("#done_tasks")!;
    const taskArr = this.todoList.getTask();
    const completedTasks = taskArr.filter((task) => task.completed === true);

    doneTasks.textContent = completedTasks.length.toString();
  }
  displayTasks() {
    const todoListElement = document.querySelector("#list_items")!;
    todoListElement.innerHTML = "";

    this.todoList.getTask().forEach((todo) => {
      const todoElement = document.createElement("li");

      todoElement.classList.add("item");
      todoElement.innerHTML = `<div class="left_task">
              <input type="checkbox" ${
                todo.completed ? "checked" : ""
              } id="task-content-${todo.id}" class="checkbox" />
              <label for="task-content-${todo.id}" class="task-label"></label>
              <p class="strikethrough">
               ${todo.text}
              </p>
            </div>
            <div class="right_icons">
              <button 
              class="edit-todo" data-id="${todo.id}">
                <img src="../public/assets/edit-icon.svg" alt="Edit Icon">
              </button>
              <button
              class="remove-todo" data-id="${todo.id}">
                <img src="../public/assets/delete-icon.svg" alt="Delete Icon">
              </button>
            </div>`;

      // Attach the event listener to the buttons
      const removeBtn = todoElement.querySelector(".remove-todo")!;
      removeBtn.addEventListener("click", () => {
        const id = parseInt(removeBtn.getAttribute("data-id")!);
        this.removeTodoById(id);
      });

      const editBtn = todoElement.querySelector(".edit-todo")!;
      editBtn.addEventListener("click", () => {
        const id = parseInt(editBtn.getAttribute("data-id")!);
        this.editTodoById(id);
      });

      // Attach an event listener for the checkbox change **********
      const checkBox = todoElement.querySelector(
        ".checkbox"
      )! as HTMLInputElement;
      checkBox.addEventListener("change", () => {
        todo.completed = checkBox.checked;
        this.updateCompletedCount();
      });

      todoListElement.appendChild(todoElement);
    });

    // Update the counts initially
    this.updateTaskCount();
    this.updateCompletedCount();
  }

  // This method adds a new task to the todoList object and updates the user interface to display the new task.
  addTodo() {
    const newTodoInput = document.querySelector(
      "#input_task"
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

  // remove a task with id
  removeTodoById(id: number) {
    this.todoList.removeTask(id);
    this.displayTasks();
  }

  editTodoById(id: number) {
    // Prompt the user to enter the new task text (can change this to any input mechanism)
    const newTextTask = prompt("Edit your task:");
    // If the user enters new text, update the task
    if (newTextTask) {
      this.todoList.editTask(id, newTextTask);
      this.displayTasks(); // Re-render the tasks to show the updated task
    }
  }
}

const todoList = new TodoList();
const ui = new TodoListUI(todoList);

ui.displayTasks();
