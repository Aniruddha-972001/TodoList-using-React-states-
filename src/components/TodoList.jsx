import todoData from "../data/todos";
import { useState, useReducer } from "react";
import "./TodoList.css";
import todoReducer from "../reducers/todoReducer";

function TodoList() {
  //const [todos, setTodos] = useState(todoData.todos);
  const [todos, dispatch] = useReducer(todoReducer, todoData.todos);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // const handleAddTodo = () => {
  //   if (inputValue.trim() == "") return;
  //   const newTodo = {
  //     id: Date.now(),
  //     todo: inputValue,
  //     completed: false,
  //     userId: 1,
  //   };
  //   //setTodos([...todos, newTodo]);     -----> to add the todo at the end
  //   setTodos([newTodo, ...todos]); // -----> to add the todo at the start
  //   // setTodos((prevTodos) => [newTodo, ...prevTodos]);    -----> always uses the latest state
  //   setInputValue("");
  // };
  const handleAddTodo = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: Date.now(),
        todo: trimmedValue,
        completed: false,
        userId: 1,
      },
    });
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.todo);
  };

  const handleSaveEdit = (id) => {
    const trimmedValue = editValue.trim();
    if (!trimmedValue) return;
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id,
        text: trimmedValue,
      },
    });
  
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">My Todos</h2>

      <div className="todo-input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id} className="todo-item">
            {editingId === item.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditValue("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  className="todo-text"
                  onClick={() => handleToggleTodo(item.id)}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.todo} {item.completed ? "✅" : "❌"}
                </span>

                <div className="todo-actions">
                  <button onClick={() => handleStartEdit(item)}>Edit</button>
                  <button onClick={() => handleDeleteTodo(item.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
