require 'rails_helper'

RSpec.feature 'Todos list', type: :feature do
  scenario 'User views a list of todos', :js do
    todos = 1.upto(3).map do |number|
      FactoryBot.create(:todo, title: "thing #{number}")
    end

    visit todos_path

    todos.each do |todo|
      expect(page).to have_content todo.title
    end
  end
end
