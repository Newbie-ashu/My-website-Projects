
const todolist=document.getElementById("todolist")
//put the data in the localstorage
let todos=JSON.parse(localStorage.getItem("todos") ||"[]")
let filter="all"
//save the data
const saveTodos=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
}

//update task
const remainingCount=document.getElementById("remaining-count")
const updateRemaining=()=>{
    const count=todos.filter((todo)=>!todo.completed).length
    remainingCount.textContent=`${count} item${count!==1?"s":""} left`
    
}

//filter out first
const filtertodos=()=>{
return todos.filter((todo)=>{
    if(filter==='active') return !todo.completed
    if(filter==='completed')return  todo.completed
    return true
})
}

//rendering the todos
const renderTodos=()=>{
    const context=filtertodos()
    .map((todo)=>
    `<div class="todo-item ${todo.completed?"completed":""}" data-id="${todo.id}"> <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}><span>${todo.title}</span><button class="delete-btn">&times</button></div>`
    ).join("")
      todolist.innerHTML=context
      updateRemaining()
}


//add task
const taskinput=document.getElementById("task")
const addtodo=()=>{
    const text=taskinput.value.trim()
    if(text.length<3){
        alert("very small")
        return
    }
    todos.push({
        id:`todo-${Date.now()}`,
            title:text,
            completed:false,
        })
        taskinput.value=""
        saveTodos()
        renderTodos()
    }

        
//addtodo listener
const add=document.getElementById("addtodo")
add.addEventListener("click",addtodo)
add.addEventListener("keypress",(event)=>{
    if(event.key=="Enter"){
        addtodo()
    }
})

//delete or mark complete status
todolist.addEventListener("click", (event) => {
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

//clearcompleted
const clearcompleted=document.getElementById("clr-com")
clearcompleted.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed)
  saveTodos()
  renderTodos()
})


const allButton = document.getElementById("all")
const activeButton = document.getElementById("active")
const completedButton = document.getElementById("completed")

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
