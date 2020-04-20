import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
        id: null,   
        email: null,
        login: null,
        isAuth: false
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {...state, ...action.user, isAuth: true};
        }

        default: return state;
    }
}

const setUserData = (user) => {
    return {
        type: SET_USER_DATA,
        user: user.data
    }
};



export const getUserData = () => (dispatch) => {
    authAPI.getUserData()
            .then(response => {
                if (response.data.resultCode === 1) { return false }
                dispatch(setUserData(response.data));
            })
}



export default authReducer;