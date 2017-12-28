class TodoChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'todos'
  end

  def add_todo(payload)
    todo = Todo.create(todo_params_for(payload))
    ActionCable.server.broadcast('todos', todo.to_json)
  end

  def destroy_todo(payload)
    todo = Todo.find(payload.fetch('id')).destroy
    ActionCable.server.broadcast('todos', todo.id)
  end

  private

  def todo_params_for(payload)
    payload.except('action')
  end
end
