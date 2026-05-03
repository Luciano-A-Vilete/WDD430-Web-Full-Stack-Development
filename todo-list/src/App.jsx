import { useState, useEffect } from "react"
import "./index.css"
import TodoItem from "./TodoItem"

const FILTERS = ["all", "active", "completed"]

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })
  const [newItemText, setNewItemText] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo(e) {
    e.preventDefault()
    if (!newItemText.trim()) return
    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), title: newItemText.trim(), completed: false },
    ])
    setNewItemText("")
  }

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const filtered = todos.filter(todo => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
    <>
      <h1 className="header">Todo List</h1>

      <form className="new-item-form" onSubmit={addTodo}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItemText}
            onChange={e => setNewItemText(e.target.value)}
            placeholder="What needs to be done?"
            autoFocus
          />
        </div>
        <button className="btn" type="submit">Add</button>
      </form>

      <div className="filter-buttons">
        {FILTERS.map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">
          {todos.length === 0 ? "No todos yet — add one above!" : "No items match this filter."}
        </p>
      ) : (
        <ul className="list">
          {filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      )}
    </>
  )
}
