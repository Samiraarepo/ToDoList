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

  removeTask(id: number) {
    this.Tasks = this.Tasks.filter((todo) => todo.id !== id);
  }
  //Remove Task by id
}
