import axios from "axios"
import { GET_USERS, LOGGEDIN_USER, LOGOUT_USER } from "./actionTypes"

export const getusers = (data) => {
    return{
        type: GET_USERS,
        data: data
    }
}
export const onloginsuccess = (data) => {
    return {
        type: LOGGEDIN_USER,
        data: data
    }
}
export const logoutuser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const fetchusers = () => {
    return function(dispatch){
        axios.get("http://localhost:8000/users")
        .then(response => {
            const users = response.data
            dispatch(getusers(users))
        })
        .catch(error => {
            console.log(error);
        })
    }
}