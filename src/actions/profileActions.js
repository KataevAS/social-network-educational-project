import { profileAPI } from "../api/api";
import * as TODO from '../constants/constants';

const setUserProfile = (profile) => {
    return {
        type: TODO.SET_PROFILE,
        profile: { ...profile },
        contacts: { ...profile.contacts }
    }
};

const setUserStatus = (status) => {
    return {
        type: TODO.SET_STATUS,
        status
    }
};

const onIsFetching = () => ({ type: TODO.ON_ISFETCHING });
const offIsFetching = () => ({ type: TODO.OFF_ISFETCHING });


export const getUserProfile = (userId) => (dispatch) => {
    dispatch(onIsFetching());
    profileAPI.getProfile(userId).then((response) => {
        dispatch(setUserProfile(response));
        dispatch(offIsFetching());
    });
    profileAPI.getStatus(userId)
        .then(response => dispatch(setUserStatus(response)));
}

