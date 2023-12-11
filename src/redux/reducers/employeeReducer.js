import { DELETE_EMPLOYEE, GET_EMPLOYEE, GET_EMPLOYEES } from "../actions/actionTypes"

const initialState = {
    employees: []
}
export const employeeReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_EMPLOYEES:
            return{employees: action.data}
        case DELETE_EMPLOYEE:
            return{employees: action.data}
        default:
            return state
    }
}