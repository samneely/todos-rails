class Todo {
  constructor({ title, maxLength } = {}) {
    this.title = title || ''
    this.maxLength = maxLength
  }

  isValid() {
    if (this.title.length == 0) return false
    return true
  }

  isInvalid() {
    return !this.isValid()
  }

  remainingCharacters() {
    return this.maxLength - this.title.length
  }
}

export default Todo
