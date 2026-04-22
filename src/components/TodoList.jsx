import todoData from "../data/todos";
import {
  useState,
  useReducer,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./TodoList.css";
import todoReducer from "../reducers/todoReducer";
import TodoItem from "./TodoItems";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from "../features/todos/todoSlice";

function TodoList() {
  //console.log("TodoList rendered");
  // const [todos, dispatch] = useReducer(
  //   todoReducer,
  //   todoData.todos,
  //   (initialTodos) => {
  //     const savedTodos = localStorage.getItem("todos");
  //     return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  //   }
  // );
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((item) =>
      item.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  const incompleteTodos = useMemo(() => {
    return filteredTodos.filter((item) => !item.completed);
  }, [filteredTodos]);

  const completedTodos = useMemo(() => {
    return filteredTodos.filter((item) => item.completed);
  }, [filteredTodos]);

  const totalTodos = todos.length;
  const incompleteCount = incompleteTodos.length;
  const completedCount = completedTodos.length;

  const handleAddTodo = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    // dispatch({
    //   type: "ADD_TODO",
    //   payload: {
    //     id: Date.now(),
    //     todo: trimmedValue,
    //     completed: false,
    //     userId: 1,
    //   },
    // });
    dispatch(
      addTodo({
        id: Date.now(),
        todo: trimmedValue,
        completed: false,
        userId: 1,
      })
    );
    setInputValue("");
  };

  // const handleDeleteTodo = useCallback((id) => {
  //   dispatch({
  //     type: "DELETE_TODO",
  //     payload: id,
  //   });
  // }, []);
  const handleDeleteTodo = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  // const handleToggleTodo = useCallback((id) => {
  //   dispatch({
  //     type: "TOGGLE_TODO",
  //     payload: id,
  //   });
  // }, []);
  const handleToggleTodo = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleStartEdit = useCallback((item) => {
    setEditingId(item.id);
    setEditValue(item.todo);
  }, []);

  // const handleSaveEdit = useCallback(
  //   (id) => {
  //     const trimmedValue = editValue.trim();
  //     if (!trimmedValue) return;
  //     dispatch({
  //       type: "EDIT_TODO",
  //       payload: {
  //         id,
  //         text: trimmedValue,
  //       },
  //     });
  //     setEditingId(null);
  //     setEditValue("");
  //   },
  //   [editValue]
  // );
  const handleSaveEdit = useCallback(
    (id) => {
      const trimmedValue = editValue.trim();
  
      if (!trimmedValue) return;
  
      dispatch(
        editTodo({
          id,
          text: trimmedValue,
        })
      );
  
      setEditingId(null);
      setEditValue("");
    },
    [dispatch, editValue]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValue("");
  }, []);

  return (
    <div className={`todo-container ${theme}`}>
      <div className="todo-header">
        <h2 className="todo-title">My Todos</h2>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <div className="todo-stats">
        <div className="stat-card">
          <h4>Total</h4>
          <p>{totalTodos}</p>
        </div>

        <div className="stat-card">
          <h4>Incomplete</h4>
          <p>{incompleteCount}</p>
        </div>

        <div className="stat-card">
          <h4>Completed</h4>
          <p>{completedCount}</p>
        </div>
      </div>

      <div className="todo-search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos..."
        />
      </div>

      <div className="todo-filter-container">
        <button
          className={filterStatus === "all" ? "active" : ""}
          onClick={() => setFilterStatus("all")}
        >
          All
        </button>
        <button
          className={filterStatus === "incomplete" ? "active" : ""}
          onClick={() => setFilterStatus("incomplete")}
        >
          Incomplete
        </button>

        <button
          className={filterStatus === "completed" ? "active" : ""}
          onClick={() => setFilterStatus("completed")}
        >
          Completed
        </button>
      </div>

      <div className="todo-input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div className="todo-sections">
        {(filterStatus === "all" || filterStatus === "incomplete") && (
          <div className="todo-section">
            <h3>Incomplete Todos</h3>

            <ul className="todo-list">
              {incompleteTodos.length === 0 ? (
                <p>No incomplete todos</p>
              ) : (
                incompleteTodos.map((item) => (
                  <TodoItem
                    key={item.id}
                    item={item}
                    isEditing={editingId === item.id}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onStartEdit={handleStartEdit}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}
                  />
                ))
              )}
            </ul>
          </div>
        )}

        {(filterStatus === "all" || filterStatus === "completed") && (
          <div className="todo-section">
            <h3>Completed Todos</h3>

            <ul className="todo-list">
              {completedTodos.length === 0 ? (
                <p>No completed todos</p>
              ) : (
                completedTodos.map((item) => (
                  <TodoItem
                    key={item.id}
                    item={item}
                    isEditing={editingId === item.id}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onStartEdit={handleStartEdit}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}
                  />
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
