import React from 'react'
import ReactDOM from 'react-dom'

import Todo from './todo'

import {
  addTodo,
  setCallback
} from './client/todo_channel'

class Todos extends React.Component {
  constructor(props) {
    super(props)

    this.createTodo = this.createTodo.bind(this)
    this.removeTodoFromList = this.removeTodoFromList.bind(this)
    this.addTodoToList = this.addTodoToList.bind(this)
    this.updateTodoLength = this.updateTodoLength.bind(this)
    this.todoIsValid = this.todoIsValid.bind(this)
    this.todoRemainingCharacters = this.todoRemainingCharacters.bind(this)

    this.state = {
      todos: props.todos,
      todoTitleLength: 0
    }
  }

  removeTodoFromList(id) {
    const todos = this.state.todos.filter((todo) => todo.id !== id)
    this.setState({ todos})
  }

  addTodoToList(todo) {
    const todos = this.state.todos.concat(todo)
    this.setState({ todos })

    const titleInput = this.refs.titleInput
    titleInput.value = ''
    titleInput.focus()
  }

  createTodo(event) {
    event.preventDefault()
    const form = this.refs.form
    const title = this.refs.titleInput.value

    addTodo({ title })
    setCallback(todo => this.addTodoToList(JSON.parse(todo)))
  }

  updateTodoLength() {
    const todoTitleLength = this.refs.titleInput.value.length
    this.setState({ todoTitleLength })
  }

  todoIsValid() {
    const { todoTitleLength } = this.state
    if (todoTitleLength == 0) return false
    return true
  }

  todoRemainingCharacters() {
    return this.props.todoMaxLength - this.state.todoTitleLength
  }

  render() {
    const { todos } = this.state
    return (
      <div>
        <form
          id='todo-form'
          onSubmit={this.createTodo}
          ref='form'
        >
          <div className='form-row'>
            <div className='todos__title-input'>
              <input
                className='form-control'
                maxLength={this.props.todoMaxLength}
                name='todo[title]'
                onKeyUp={this.updateTodoLength}
                placeholder='Add a honey-do to the list'
                ref='titleInput'
                required
                type='text'
              />
            </div>
            <div className='col-auto'>
              <button
                className='btn btn-primary'
                disabled={!this.todoIsValid()}
              >
                Add a honey-do
              </button>
            </div>
          </div>
          <span className='todos__remaining-characters'>
            Remaining Characters {this.todoRemainingCharacters()}
          </span>
        </form>
        <div
          className='todos__grid'
          id='todos'
        >
          {
            todos.map((todo) => {
              return <Todo
                key={todo.id}
                removeTodoFromList={this.removeTodoFromList}
                todo={todo}
              />
            })
          }
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('todos_data')
  const data = JSON.parse(node.dataset.todos)
  const maxLength = JSON.parse(node.dataset.todoMaxLength)

  ReactDOM.render(
    <Todos
      todoMaxLength={maxLength}
      todos={data}
    />,
    document.body.appendChild(document.createElement('div'))
  )
})
