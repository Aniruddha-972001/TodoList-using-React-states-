function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [action.payload, ...state];

    case "DELETE_TODO":
      return state.filter((item) => item.id !== action.payload);

    case "TOGGLE_TODO":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );

    case "EDIT_TODO":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, todo: action.payload.text }
          : item
      );

    default:
      return state;
  }
}

export default todoReducer;