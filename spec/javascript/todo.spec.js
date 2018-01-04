import Todo from 'todo'

describe('Todo', () => {

  describe('validation', () => {
    it('is valid when title is longer than 0 characters', () => {
      const todo = new Todo({ title: 'abc' })
      expect(todo.isValid()).toEqual(true)
    })

    it ('is invalid when title is 0 characters', () => {
      const todo = new Todo()
      expect(todo.isInvalid()).toEqual(true)
    })
  })

  it('tracks remaining characters based on an injected max length', () => {
    const todo = new Todo({ title: 'abc', maxLength: 5 })
    expect(todo.remainingCharacters()).toEqual(2)
  })

})
