import { authAPI, profileAPI } from "../../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_INVALID_LOGIN = 'SET_INVALID_LOGIN';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
const OFF_LOADING = 'OFF_LOADING';
const ON_LOADING = 'ON_LOADING';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';


let initialState = {
    authUser: {
        email: null,
        id: null,
        login: null,
        photo: {
            small: null,
            large: null
        }
    },
    messages: [],
    isAuth: false,
    loading: true,
    invalidLogin: false
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA: {
            return { ...state, authUser: { ...action.user }, isAuth: true };
        }

        case DELETE_USER_DATA: {
            return { ...state, ...initialState, authUser: { ...initialState.data } };
        }

        case OFF_LOADING: {
            return { ...state, loading: false };
        }

        case ON_LOADING: {
            return { ...state, loading: true };
        }

        case SET_INVALID_LOGIN: {
            return { ...state, invalidLogin: true };
        }

        default: return state;
    }
}

const offLoading = () => ({ type: OFF_LOADING });

const setInvalidLogin = () => ({ type: SET_INVALID_LOGIN });

const deleteUserData = () => ({ type: DELETE_USER_DATA });

const setUserData = (user) => {
    return {
        type: SET_USER_DATA,
        user
    }
};

const updateUserData = (user) => {
    return {
        type: UPDATE_USER_DATA,
        user
    }
};
//////////////////////////////////////////////////////////////////////
export const firstLoadingSPA = () => (dispatch) => {
    authAPI.getUserData()
        .then(res => {
            if (res.resultCode === 1) {
                dispatch(offLoading());
                return false;
            }
            const authData = res.data;
            profileAPI.getProfile(authData.id)
                .then((res) => {
                    dispatch(setUserData({...res, login: authData.login}));
                    dispatch(offLoading());
                })
        })
}
//////////////////////////////////////////////////////////////////////
export const getUserData = () => (dispatch) => {
    authAPI.getUserData()
        .then(response => {
            if (response.resultCode === 1) { return false }
            dispatch(setUserData(response));
        })
}
//////////////////////////////////////////////////////////////////////
export const loginIn = (obj) => (dispatch) => {
    authAPI.loginIn(obj.email, obj.password, obj.rememberMe)
        .then(response => {
            if (response.resultCode === 1) { return dispatch(setInvalidLogin()); }
            dispatch(firstLoadingSPA());
        })
}
//////////////////////////////////////////////////////////////////////
export const loginOut = () => (dispatch) => {
    authAPI.loginOut()
        .then(response => {
            if (response.resultCode === 1) { return false }
            dispatch(deleteUserData());
            dispatch(offLoading());
        })
}
//////////////////////////////////////////////////////////////////////
export const editProfileData = (profile) => (dispatch) => {
    return profileAPI.setProfileData(profile).then(res => {
        dispatch(updateUserData(res));
    });
}




export default authReducer;