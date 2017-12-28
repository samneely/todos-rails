import React from 'react'
import ReactDOM from 'react-dom'

import {
  addTodo,
  setCallback
} from './client/todo_channel'

class Todos extends React.Component {
  constructor(props) {
    super(props)

    this.createTodo = this.createTodo.bind(this)
    this.addTodoToList = this.addTodoToList.bind(this)
    this.state = {
      todos: props.todos
    }
  }

  addTodoToList(todo) {
    const todos = [...this.state.todos].concat(todo)
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
                name='todo[title]'
                placeholder='Add a honey-do to the list'
                ref='titleInput'
                type='text'
              />
            </div>
            <div className='col-auto'>
              <button
                className='btn btn-primary'
              >
                Add a honey-do
              </button>
            </div>
          </div>
        </form>
        <div id='todos'>
          {
            todos.map((todo) => {
              return <div key={todo.id}>{todo.title}</div>
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

  ReactDOM.render(
    <Todos todos={data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
