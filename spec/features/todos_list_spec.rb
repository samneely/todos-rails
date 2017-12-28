require 'rails_helper'

RSpec.feature 'Todos list', type: :system do
  before do
    driven_by(:headless_chrome)
  end

  let!(:todos) do
    1.upto(3).map do |number|
      FactoryBot.create(:todo, title: "thing #{number}")
    end
  end

  scenario 'User views a list of todos' do
    visit todos_path

    todos.each do |todo|
      expect(page).to have_content todo.title
    end
  end

  scenario 'User adds a todo to the list' do
    todo = FactoryBot.build(:todo, title: 'Play videogames')
    visit todos_path

    fill_in 'todo[title]', with: todo.title
    click_button 'Add a honey-do'

    expect(page).to have_content todo.title
  end
end
