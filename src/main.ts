import './style.css'

interface Todo {
  title: string,
  isDone: boolean,
  readonly id: string
}

const todos: Todo[] = [];


const Form = document.querySelector('#todoForm') as HTMLFormElement;
const inputElement = document.getElementsByName('todoInput')[0] as HTMLInputElement;
let todoList = document.querySelector('.myTodo') as HTMLUListElement;
let heading= document.querySelector('h1') as HTMLHeadElement;

// check todo is empty
function CheckEmpty() {
  if (todos.length === 0) {
    let LI: HTMLLIElement = document.createElement('li');
    LI.innerHTML = `<li class='empty'>No Item yet!</li>`;
    todoList.appendChild(LI)
  }
}
window.addEventListener('DOMContentLoaded', CheckEmpty)

// Submit New Todo
Form.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const newTodo: Todo = {
    title: inputElement.value,
    isDone: false,
    id: String(Math.ceil(Math.random() * 1000))
  }
  todos.push(newTodo)
  inputElement.value = '';
  inputElement.focus();
  showTodoList(todos)

}
function generateTodo(title: string, isDone: boolean, id: string) {
  // li element
  let Li: HTMLLIElement = document.createElement('li');

  // label element
  let label: HTMLLabelElement = document.createElement('label');
  label.className = isDone ? 'form-control textcut' : 'form-control';
  label.textContent = title;

  // checkbox
  let checkBox: HTMLInputElement = document.createElement('input');
  checkBox.name = 'checkbox';
  checkBox.setAttribute("type", "checkbox")
  checkBox.checked = isDone;
  checkBox.onchange = function () {

    todos.find(item => {
      if (item.id == id) {
        item.isDone = checkBox.checked;
      }
    })
    label.className = checkBox.checked ? 'form-control textcut' : 'form-control'
  };

  // button
  let button: HTMLButtonElement = document.createElement('button')
  button.className = 'btn';
  button.textContent = 'delete';
  button.setAttribute("id", id);
  button.onclick = () => deleteTodo(id)

  label.append(checkBox)
  Li.append(label)
  Li.append(button)
  todoList.appendChild(Li)
}

function showTodoList(todo: Todo[]) {

  todoList.innerHTML = '';

  todo.forEach(item => {
    generateTodo(item.title, item.isDone, item.id)
  })
  heading.innerHTML =  `Todo App <span>${todo.length?todo.length:''}</span>`
 
}


function deleteTodo(id: string) {
  const SelectedTodo = todos.findIndex(item => item.id === id)
  todos.splice(SelectedTodo, 1)
  showTodoList(todos)
  CheckEmpty()
}