import { applyMiddleware, combineReducers, createStore } from "redux";
import { employeeReducer } from "./reducers/employeeReducer";
import thunk from 'redux-thunk'
import { loginReducer } from "./reducers/loginReducer";

const rootreducer = combineReducers({employees: employeeReducer, users: loginReducer})
const store = createStore(rootreducer, applyMiddleware(thunk))

export default store;   