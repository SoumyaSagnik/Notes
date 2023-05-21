import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AddTodoAction, RemoveTodoAction } from "./actions/TodoActions";

const App = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const Todo = useSelector((state) => state.Todo);
  const { todos } = Todo;

  function handleSubmit(e) {
    e.preventDefault();
    if (input !== "") {
      dispatch(AddTodoAction(input));
      setInput("");
    }
  }

  function handleDelete(todo) {
    console.log(todo);
    dispatch(RemoveTodoAction(todo));
  }

  return (
    <header className="App">
      <h2>To do list with redux</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a todo"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit" onClick={handleSubmit}>
          Go
        </button>
      </form>
      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo.todo}>
              <span>{todo.todo}</span>
              <button onClick={() => handleDelete(todo)}>&times;</button>
            </li>
          ))}
      </ul>
    </header>
  );
};

export default App;
