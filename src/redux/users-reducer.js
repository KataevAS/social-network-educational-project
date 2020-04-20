import { usersAPI } from "../api/api";

const SET_USERS = 'SET_USERS';
const SET_MORE_USERS = 'SET_MORE_USERS';
const SET_SELECT_PAGE = 'SET_SELECT_PAGE';
const TOGGLE_ISFETCHING = 'TOGGLE_ISFETCHING';
const TOGGLE_LOADING = 'TOGGLE_LOADING';


let initialState = {
    pageUsers: [{
        id: '',
        name: 'state',
        photos: {
            small: null,
            large: null
        },
        status: null,
        followed: false
    }],
    totalCount: 1,
    isFetching: false,
    loading: false,
    selectedUsersPage: 1
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS: {
            return { ...state, pageUsers: [...action.users], totalCount: action.totalCount };
        }

        case SET_MORE_USERS: {
            return { ...state, pageUsers: [...state.pageUsers, ...action.users] };
        }

        case TOGGLE_ISFETCHING: {
            return { ...state, isFetching: !state.isFetching };
        }

        case TOGGLE_LOADING: {
            return { ...state, loading: !state.loading };
        }
        
        case SET_SELECT_PAGE: {
            return { ...state, selectedUsersPage: action.selectedUsersPage };
        }

        default: return state;
    }
}

const toggleIsFetching = () => ({type: TOGGLE_ISFETCHING})

const toggleLoading = () => ({type: TOGGLE_LOADING})

const setUsers = (data) => {
    return {
        type: SET_USERS,
        users: data.items,
        totalCount: data.totalCount
    }
};

const setMoreUsers = (data) => {
    return {
        type: SET_MORE_USERS,
        users: data.items,
    }
};

export const setSelectedUsersPage = (selectedUsersPage) => {
    return {
        type: SET_SELECT_PAGE,
        selectedUsersPage
    }
};


export const getUsers = (pageNumber) => (dispatch) => {
    dispatch(toggleIsFetching());
    usersAPI.getUsers(pageNumber)
            .then((response) => {
                dispatch(setUsers(response.data));
                dispatch(toggleIsFetching());
            });
}

export const getMoreUsers = (pageNumber) => (dispatch) => {
    dispatch(toggleLoading());
    usersAPI.getUsers(pageNumber)
            .then((response) => {
                dispatch(setMoreUsers(response.data));
                dispatch(toggleLoading());
            });
}






export default usersReducer;