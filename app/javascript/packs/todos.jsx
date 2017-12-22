import React from 'react'
import ReactDOM from 'react-dom'

class Todos extends React.Component {
  render() {
    const { todos } = this.props
    return (
      <ol id='todos'>
        {
          todos.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>
          })
        }
      </ol>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let node = document.getElementById('todos_data')
  let data = JSON.parse(node.dataset.todos);

  ReactDOM.render(
    <Todos todos={data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
