import { usersAPI } from "../../api/api";

const SET_USERS = 'SET_USERS';
const SET_MORE_USERS = 'SET_MORE_USERS';
const SET_SELECT_PAGE = 'SET_SELECT_PAGE';
const SET_FOLLOW_USER = 'SET_FOLLOW_USER';
const SET_UNFOLLOW_USER = 'SET_UNFOLLOW_USER';
const TOGGLE_ISFETCHING = 'TOGGLE_ISFETCHING';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const TOGGLE_LOADING_FOLLOW_BTN = 'TOGGLE_LOADING_FOLLOW_BTN';


let initialState = {
    pageUsers: [{
        id: '',
        name: 'state',
        photos: {
            small: null,
            large: null
        },
        status: null,
        followed: false,
        loadingFollowBtn: false
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

        case TOGGLE_LOADING_FOLLOW_BTN: {
            const indexUser = state.pageUsers.findIndex(u => u.id === action.userId);
            const arr = [...state.pageUsers];
            arr[indexUser].loadingFollowBtn = !arr[indexUser].loadingFollowBtn;
            return {
                ...state,
                pageUsers: arr
            };
        }

        case SET_SELECT_PAGE: {
            return { ...state, selectedUsersPage: action.selectedUsersPage };
        }

        case SET_FOLLOW_USER: {
            const indexUser = state.pageUsers.findIndex(u => u.id === action.userId);
            const arr = [...state.pageUsers];
            arr[indexUser].followed = true;
            return {
                ...state,
                pageUsers: arr
            };
        }

        case SET_UNFOLLOW_USER: {
            const indexUser = state.pageUsers.findIndex(u => u.id === action.userId);
            const arr = [...state.pageUsers];
            arr[indexUser].followed = false;
            return {
                ...state,
                pageUsers: arr
            };
        }

        default: return state;
    }
}

const toggleIsFetching = () => ({ type: TOGGLE_ISFETCHING })

const toggleLoading = () => ({ type: TOGGLE_LOADING})

const toggleLoadingFollowBtn = (userId) => ({ type: TOGGLE_LOADING_FOLLOW_BTN, userId })

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

const setFollowUser = (userId) => {
    return {
        type: SET_FOLLOW_USER,
        userId
    }
};

const setUnFollowUser = (userId) => {
    return {
        type: SET_UNFOLLOW_USER,
        userId
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

export const followUser = (userId) => (dispatch) => {
    dispatch(toggleLoadingFollowBtn(userId));
    usersAPI.followUser(userId)
        .then((response) => {
            if (response.resultCode === 1) { return false; }
            dispatch(setFollowUser(userId));
            dispatch(toggleLoadingFollowBtn(userId));
        });
}

export const unFollowUser = (userId) => (dispatch) => {
    dispatch(toggleLoadingFollowBtn(userId));
    usersAPI.unFollowUser(userId)
        .then((response) => {
            if (response.resultCode === 1) { return false; }
            dispatch(setUnFollowUser(userId));
            dispatch(toggleLoadingFollowBtn(userId));
        });
}






export default usersReducer;