import { profileAPI } from "../api/api";

const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const TOGGLE_ISFETCHING = 'TOGGLE_ISFETCHING';


let initialState = {
    id: "",
    lookingForAJob: false,
    lookingForAJobDescription: "",
    contacts: {
        github: "",
        vk: "",
        facebook: "",
        instagram: "",
        twitter: "",
        website: "",
        youtube: "",
        mainLink: "",
    },
    name: "",
    status: "I can do it!",
    photos: {
        small: null,
        large: null
    },
    followed: false,
    isFetching: false
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PROFILE: {
            return { ...state, ...action.profile };
        }

        case SET_STATUS: {
            return { ...state, status: action.status };
        }

        case TOGGLE_ISFETCHING: {
            return { ...state, isFetching: !state.isFetching };
        }

        default: return state;
    }
}

const setUserProfile = (profile) => {
    return {
        type: SET_PROFILE,
        profile: { ...profile },
        contacts: { ...profile.contacts }
    }
};

const setUserStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
};

const toggleIsFetching = () => ({type: TOGGLE_ISFETCHING});


export const getUserProfile = (userId) => (dispatch) => {
    dispatch(toggleIsFetching());
    if (!userId) { userId = "7064"; }
    profileAPI.getProfile(userId).then((response) => {
        dispatch(setUserProfile(response));
        dispatch(toggleIsFetching());
    });
    profileAPI.getStatus(userId)
        .then(response => dispatch(setUserStatus(response)));
}


export default profileReducer;