import createChannel from './cable'

let callback

const channel = createChannel('TodoChannel', {
  received(todo) {
    if (callback) callback.call(null, todo)
  }
});

function addTodo(todo) {
  channel.perform('add_todo', todo)
}

function destroyTodo(id) {
  channel.perform('destroy_todo', { id })
}

function setCallback(fn) {
  callback = fn
}

export {
  addTodo,
  destroyTodo,
  setCallback
}
