import TodoList from "./components/TodoList";
import ThemeProvider from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TodoList />
      </ThemeProvider>
    </Provider>
  );
}

export default App;