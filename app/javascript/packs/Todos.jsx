import React from 'react'
import ReactDOM from 'react-dom'

import TodoRow from './TodoRow'
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
    this.updateTodo = this.updateTodo.bind(this)

    this.state = {
      todos: props.todos,
      potentialTodo: new Todo({ maxLength: props.todoMaxLength })
    }
  }

  removeTodoFromList(id) {
    const todos = this.state.todos.filter((todo) => todo.id !== id)
    this.setState({ todos })
  }

  addTodoToList(todo) {
    const todos = this.state.todos.concat(todo)
    const potentialTodo = new Todo({ ...this.state.potentialTodo, title: '' })

    this.setState({
      todos,
      potentialTodo
    }, () => {
      const { titleInput } = this.refs
      titleInput.value = potentialTodo.title
      titleInput.focus()
    })
  }

  createTodo(event) {
    event.preventDefault()
    const form = this.refs.form
    const title = this.refs.titleInput.value

    addTodo({ title })
    setCallback(todo => this.addTodoToList(JSON.parse(todo)))
  }

  updateTodo() {
    const { potentialTodo } = this.state
    const title = this.refs.titleInput.value
    this.setState({
      potentialTodo: new Todo({ ...potentialTodo, title })
    })
  }

  render() {
    const { todos, potentialTodo } = this.state

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
                maxLength={potentialTodo.maxLength}
                name='todo[title]'
                onKeyUp={this.updateTodo}
                placeholder='Add a honey-do to the list'
                ref='titleInput'
                required
                type='text'
              />
            </div>
            <div className='col-auto'>
              <button
                className='btn btn-primary'
                disabled={potentialTodo.isInvalid()}
              >
                Add a honey-do
              </button>
            </div>
          </div>
          <span className='todos__remaining-characters'>
            Remaining characters: {potentialTodo.remainingCharacters()}
          </span>
        </form>
        <div
          className='todos__grid'
          id='todos'
        >
          {
            todos.map((todo) => {
              return <TodoRow
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
