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
  displayTask() {
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
                <svg width="32px" height="32px" viewBox="-1.28 -1.28 66.56 66.56" xmlns="http://www.w3.org/2000/svg"
                  stroke-width="3" stroke="#ffffff" fill="none">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M55.5,23.9V53.5a2,2,0,0,1-2,2h-43a2,2,0,0,1-2-2v-43a2,2,0,0,1,2-2H41.64">
                    </path>
                    <path
                      d="M19.48,38.77l-.64,5.59a.84.84,0,0,0,.92.93l5.56-.64a.87.87,0,0,0,.5-.24L54.9,15.22a1.66,1.66,0,0,0,0-2.35L51.15,9.1a1.67,1.67,0,0,0-2.36,0L19.71,38.28A.83.83,0,0,0,19.48,38.77Z">
                    </path>
                    <line x1="44.87" y1="13.04" x2="50.9" y2="19.24"></line>
                  </g>
                </svg>
              </button>
              <button aria-label="Delete Task" data-id="${todo.id}">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0,0,256,256">
                  <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                    stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                    font-family="none" font-weight="none" font-size="none" text-anchor="none"
                    style="mix-blend-mode: normal">
                    <g transform="scale(10.66667,10.66667)">
                      <path
                        d="M10,2l-1,1h-5v2h1v15c0,0.52222 0.19133,1.05461 0.56836,1.43164c0.37703,0.37703 0.90942,0.56836 1.43164,0.56836h10c0.52222,0 1.05461,-0.19133 1.43164,-0.56836c0.37703,-0.37703 0.56836,-0.90942 0.56836,-1.43164v-15h1v-2h-5l-1,-1zM7,5h10v15h-10zM9,7v11h2v-11zM13,7v11h2v-11z">
                      </path>
                    </g>
                  </g>
                </svg>
              </button>


            </div>`;
      todoListElement.appendChild(todoElement);
    });
  }
}
