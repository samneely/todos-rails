import React from 'react'

import {
  destroyTodo,
  setCallback
} from './client/todo_channel'

class Todo extends React.Component {
  constructor(props) {
    super(props)

    this.removeTodo = this.removeTodo.bind(this)
  }

  removeTodo() {
    const checkbox = this.refs.checkbox
    const todoId = checkbox.dataset.removeTodo
    destroyTodo(todoId)
    setCallback(todoId => this.props.removeTodoFromList(todoId))
  }

  render() {
    const { todo } = this.props
    return (
      <div
        className='todos__row'
        data-todo={todo.id}
      >
        <label>
          <input
            aria-label='Mark as completed'
            className='todos__checkbox'
            data-remove-todo={todo.id}
            onChange={this.removeTodo}
            ref='checkbox'
            type='checkbox'
          />
          <span>{todo.title}</span>
        </label>
      </div>
    )
  }
}

export default Todo
