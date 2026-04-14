import todoData from "../data/todos";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState(todoData.todos);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTodo = () => {
    if(inputValue.trim() == "") return;
    const newTodo = {
      id: Date.now(),
      todo: inputValue,
      completed: false,
      userId: 1,
    };
    //setTodos([...todos, newTodo]);     -----> to add the todo at the end
    setTodos([newTodo, ...todos]); // -----> to add the todo at the start
    // setTodos((prevTodos) => [newTodo, ...prevTodos]);    -----> always uses the latest state
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.todo);
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim() === "") return;

    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, todo: editValue.trim() } : item
      )
    );

    setEditingId(null);
    setEditValue("");
  };

  return (
    <div>
      <h2>My Todos</h2>

      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }} >
            {editingId === item.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => handleToggleTodo(item.id)}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {item.todo} {item.completed ? "✅" : "❌"}
                </span>

                <button onClick={() => handleStartEdit(item)}>Edit</button>
              </>
            )}

            <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
