class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.string :title, limit: 80

      t.timestamps
    end
  end
end
