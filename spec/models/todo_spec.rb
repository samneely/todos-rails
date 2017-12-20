require 'rails_helper'

RSpec.describe Todo, type: :model do
  it 'requires title to be present' do
    todo = described_class.new
    todo.validate
    expect(todo.errors[:title]).to include "can't be blank"
  end

  it 'limits title to a maximum of 80 characters' do
    todo = described_class.new(
      title: ('a' * 81)
    )
    todo.validate
    expect(todo.errors[:title]).to include 'is too long (maximum is 80 characters)'
  end
end
