import todoData from "../data/todos";
import { useState } from "react";

function TodoList(){
    const [todos,setTodos] = useState(todoData.todos);
    const [inputValue, setInputValue] = useState("");

    const handleAddTodo = () => {
        const newTodo = {
            id: Date.now(),
            todo: inputValue,
            completed: false,
            userId: 1,
        };
        //setTodos([...todos, newTodo]);     -----> to add the todo at the end
        //setTodos([newTodo,...todos]);      -----> to add the todo at the start
        setTodos((prevTodos) => [newTodo, ...prevTodos]);   // -----> always uses the latest state
        setInputValue("");
    }

    const handleDeleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
      };

    return (
        <div> 
            <h2> My Todos </h2>
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
                <li key={item.id}>
                    {item.todo} 
                    {item.completed ? "✅" : "❌"}
                    <button onClick={()=>handleDeleteTodo(item.id)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
    );
}
export default TodoList;