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
