import {GET_EMPLOYEES, DELETE_EMPLOYEE, GET_EMPLOYEE} from './actionTypes.js';
import axios from "axios";

export const getemployees = (data) => {
    return {
        type: GET_EMPLOYEES,
        data: data
    }
}

export const getemployee = () => {
    return {
        type: GET_EMPLOYEE
    }
}

export const deleteemployee = () => {
    return {
        type: DELETE_EMPLOYEE
    }
}

export const fetchEmployees = () => {
    return function(dispatch){
        axios.get("http://localhost:8000/employees")
        .then(response => {
            const employees = response.data
            dispatch(getemployees(employees))
        })
        .catch(error => {
            console.log(error);
        })
    }
}