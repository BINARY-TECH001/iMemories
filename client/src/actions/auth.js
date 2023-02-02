import { AUTH } from "../constants/actionTypes";
import * as api from "../api";


export const signin = (formData, history) => async (dispatch) =>{
    try {
        //Login user...
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) =>{
    try {
        //sign up user...
        const { data } = await api.signup(formData)
        dispatch({ type: AUTH, data })
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

