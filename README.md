# Todo List App (React + Vite)

A modern Todo List application built step-by-step while learning core React concepts and state management patterns.  
This project started as a basic todo app and was gradually enhanced into a feature-rich frontend application using:

- React Hooks
- Component Architecture
- useReducer
- Context API
- useMemo
- useRef
- React.memo
- useCallback
- Local Storage
- Redux Toolkit
- Responsive CSS UI

---

# Project Purpose

This project was built as a hands-on learning application to understand how real frontend apps grow over time.

Instead of only learning hooks theoretically, each concept was implemented inside an actual working project.

---

# Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS3
- Redux Toolkit
- React Redux

---

# Features Implemented

---

## 1. Add Todo

Users can add new todo items.

### Concepts Used

- `useState`
- Controlled Inputs
- Event Handling

---

## 2. Delete Todo

Users can remove todos.

### Concepts Used

- Array filtering
- State updates
- Immutable logic

---

## 3. Toggle Complete / Incomplete

Users can mark todos as completed.

### Concepts Used

- Conditional rendering
- State mapping
- Dynamic styling

---

## 4. Edit Todo

Users can edit existing todos.

### Concepts Used

- Local UI state
- Conditional rendering
- Forms inside list items

---

## 5. Split Todos into Two Sections

Todos are displayed in:

- Incomplete Todos
- Completed Todos

### Concepts Used

- Array filtering
- UI grouping
- Cleaner UX

---

## 6. Search Todos

Users can search todos in real time.

### Concepts Used

- Controlled inputs
- Derived state
- Filtering arrays

---

## 7. Filter Buttons

Users can filter by:

- All
- Incomplete
- Completed

### Concepts Used

- Conditional rendering
- UI state management

---

## 8. Dashboard Stats

Shows:

- Total Todos
- Incomplete Todos
- Completed Todos

### Concepts Used

- Derived values
- Dynamic UI cards

---

# React Concepts Implemented

---

## useState

Used for:

- Input fields
- Edit values
- Search term
- Filter status
- UI states

---

## useReducer

Originally todos were managed using:

```js
const [todos, dispatch] = useReducer(todoReducer, initialTodos);
```

Used for centralized state update logic instead of multiple useState calls.

### Benefits:

- Cleaner state transitions
- Better for complex state logic
- Predictable updates using actions
- Scalable architecture

### Actions Implemented:

- `ADD_TODO`
- `DELETE_TODO`
- `TOGGLE_TODO`
- `EDIT_TODO`

---

## useEffect

Used for handling side effects outside normal rendering.

### 1. Local Storage Persistence

```js
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

Whenever todos change, data is saved in browser storage.

### 2. Auto Focus Edit Input

```js
useEffect(() => {
  if (isEditing && editInputRef.current) {
    editInputRef.current.focus();
  }
}, [isEditing]);
```

Automatically focuses the input when editing begins.

### Concepts Learned:

- Side effects
- Dependency arrays
- Running logic after render

---

## useMemo

Used for memoizing expensive derived values.

### Examples:

```js
const filteredTodos = useMemo(() => {
  return todos.filter((item) =>
    item.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [todos, searchTerm]);
```

```js
const completedTodos = useMemo(() => {
  return filteredTodos.filter((item) => item.completed);
}, [filteredTodos]);
```

### Benefits:

- Prevents unnecessary recalculation
- Improves performance during re-renders
- Useful for filtered lists and derived state

---

## useRef

Used for accessing DOM elements directly.

### Example:

```js
const editInputRef = useRef(null);
```

Then:

```js
editInputRef.current.focus();
```

### Benefits:

- Persist values between renders
- DOM access without re-render
- Input focus management

---

## Context API

Used for global theme management.

### Theme Context Features:

- Light Mode
- Dark Mode

### Implementation:

```js
createContext()
useContext()
Provider Pattern
```

### Benefits:

- Avoids prop drilling
- Shares state globally
- Clean theme architecture

---

## React.memo

Used to optimize TodoItem component.

```js
export default memo(TodoItems);
```

### Purpose:

Prevents unnecessary child component re-renders when props remain unchanged.

### Benefits:

- Better rendering performance
- Useful for reusable list items
- Works well with useCallback

---

## useCallback

Used to memoize handler functions passed as props.

### Examples:

```js
const handleDeleteTodo = useCallback((id) => {
  dispatch(deleteTodo(id));
}, []);
```

```js
const handleToggleTodo = useCallback((id) => {
  dispatch(toggleTodo(id));
}, []);
```

### Benefits:

- Prevents new function creation on every render
- Helps React.memo
- Improves child rendering performance

---

## Redux Toolkit

Todo state was migrated from local reducer state to Redux Toolkit.

### Implemented:

- `configureStore()`
- `createSlice()`
- `useSelector()`
- `useDispatch()`

### Example:

```js
const todos = useSelector((state) => state.todos);
const dispatch = useDispatch();
```

### Benefits:

- Centralized global state
- Cleaner reducers
- Scalable architecture
- Easier debugging
- Production-ready state management

### Slice Actions:

- `addTodo`
- `deleteTodo`
- `toggleTodo`
- `editTodo`
