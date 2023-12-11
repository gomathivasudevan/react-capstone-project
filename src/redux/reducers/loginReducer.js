import { GET_USERS, LOGGEDIN_USER, LOGOUT_USER } from "../actions/actionTypes"

const initialState = {
    users:[],
    loggedInUser:null,
    isLoggedIn: false
}

export const loginReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return{users: action.data}
        case LOGGEDIN_USER:
            return{...state, isLoggedIn:true, loggedInUser: action.data}
        case LOGOUT_USER:
            return{...state,loginReducer: null,isLoggedIn: false}
        default:
            return state
    }
}