import createChannel from './cable'

let callback

const chat = createChannel('TodoChannel', {
  received(todo) {
    if (callback) callback.call(null, todo)
  }
});

function addTodo(todo) {
  chat.perform('add_todo', todo)
}

function setCallback(fn) {
  callback = fn
}

export { addTodo, setCallback }
