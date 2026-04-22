import { useRef, useEffect, memo } from "react";

function TodoItems({
  item,
  isEditing,
  editValue,
  setEditValue,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) {
  console.log("TodoItem rendered:", item.id);

  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            ref={editInputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className="todo-actions">
            <button onClick={() => onSaveEdit(item.id)}>Save</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span
            className="todo-text"
            onClick={() => onToggle(item.id)}
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {item.todo} {item.completed ? "✅" : "❌"}
          </span>

          <div className="todo-actions">
            <button onClick={() => onStartEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default memo(TodoItems);