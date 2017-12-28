class TodoChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'todos'
  end

  def add_todo(payload)
    todo = Todo.create(todo_params_for(payload))
    ActionCable.server.broadcast('todos', todo.to_json)
  end

  private

  def todo_params_for(payload)
    payload.except('action')
  end
end
