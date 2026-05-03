export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
      <button onClick={() => deleteTodo(todo.id)} aria-label="Delete todo">
        ✕
      </button>
    </li>
  )
}
