const addButton = document.getElementById("addtodo")
const taskInput = document.getElementById("task")
const todoList = document.getElementById("todolist")
const remainingCount = document.getElementById("remaining-count")
const clearCompleted = document.getElementById("clr-com")
const allButton = document.getElementById("all")
const activeButton = document.getElementById("active")
const completedButton = document.getElementById("completed")

let todos = JSON.parse(localStorage.getItem("todos") || "[]")
let filter = "all"

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

const getVisibleTodos = () => {
  return todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
      return true
    
  })
}
const remainingCount=document.getElementById("")
const updateRemaining = () => {
  const count = todos.filter((todo) => !todo.completed).length
  remainingCount.textContent = `${count} item${count !== 1 ? "s" : ""} left`
}

const renderTodos = () => {
  const html = getVisibleTodos()
    .map(
      (todo) =>
        `<div class="todo-item ${todo.completed ? "completed" : ""}" data-id="${todo.id}">
          <label>
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
            <span>${todo.title}</span>
          </label>
          <button class="delete-btn" aria-label="Delete todo">×</button>
        </div>`,
    )
    .join("")

  todoList.innerHTML = html
  updateRemaining()
}

const addTodo = () => {
  const text = taskInput.value.trim()
  if (text.length < 3) {
    alert("Please enter at least 3 characters.")
    return
  }

  todos.push({
    id: `todo-${Date.now()}`,
    title: text,
    completed: false,
  })

  taskInput.value = ""
  saveTodos()
  renderTodos()
}

addButton.addEventListener("click", addTodo)

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo()
  }
})

todoList.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item")
  if (!item) return

  const id = item.dataset.id
  if (event.target.classList.contains("todo-checkbox")) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: event.target.checked } : todo,
    )
    saveTodos()
    renderTodos()
  }

  if (event.target.classList.contains("delete-btn")) {
    if (!confirm("Delete this task?")) return
    todos = todos.filter((todo) => todo.id !== id)
    saveTodos()
    renderTodos()
  }
})

clearCompleted.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed)
  saveTodos()
  renderTodos()
})

allButton.addEventListener("click", () => {
  filter = "all"
  renderTodos()
})
activeButton.addEventListener("click", () => {
  filter = "active"
  renderTodos()
})
completedButton.addEventListener("click", () => {
  filter = "completed"
  renderTodos()
})

renderTodos()


