## main.jsx

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## App.jsx

```javascript
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
```

---

## store.jsx

```javascript
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { TodoReducer } from "./reducers/TodoReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  Todo: TodoReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```

---

## TodoReducer.jsx

```javascript
export const TodoReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { todos: action.payload };
    case "REMOVE_TODO":
      return { todos: action.payload };
    default:
      return state;
  }
};
```

---

## TodoActions.jsx

```javascript
export const AddTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  const hasTodo = todos.find((i) => i.todo === todo);

  if (!hasTodo && todo !== "") {
    dispatch({
      type: "ADD_TODO",
      payload: [...todos, { todo }],
    });
  }
};

export const RemoveTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  dispatch({
    type: "REMOVE_TODO",
    payload: todos.filter((t) => t.todo !== todo.todo),
  });
};
```

---
