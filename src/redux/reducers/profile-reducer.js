import * as TODO from '../constants/constants';


let initialState = {
    id: "",
    lookingForAJob: false,
    lookingForAJobDescription: "",
    contacts: {
        github: null,
        vkontakte: null,
        facebook: null,
        instagram: null,
        twitter: null,
        website: null,
        youtube: null,
        mainLink: null
    },
    name: "",
    status: "",
    aboutMe: "",
    photos: {
        small: null,
        large: null
    },
    photosLoader: false,
    followed: false,
    isFetching: false
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case TODO.SET_PROFILE: {
            const obj = action.profile.contacts;
            const arrContacts = Object.keys(obj).reduce((acc, key) => {
                if (obj[key]) {
                    return (key === 'vk') ? { ...acc, 'vkontakte': obj[key] } : { ...acc, [key]: obj[key] };
                }
                return acc;
            }, {});
            return { ...state, ...action.profile, contacts: arrContacts };
        }

        case TODO.SET_STATUS: {
            return { ...state, status: action.status };
        }

        case TODO.ON_ISFETCHING: {
            return { ...state, isFetching: true };
        }

        case TODO.OFF_ISFETCHING: {
            return { ...state, isFetching: false };
        }

        case TODO.ON_PHOTO_LOADER: {
            return { ...state, photosLoader: true };
        }

        case TODO.OFF_PHOTO_LOADER: {
            console.log("true")
            return { ...state, photosLoader: false };
        }

        case TODO.SET_USE_PHOTO: {
            return { ...state, photos: { ...state.photos, ...action.photos } };
        }

        default: return state;
    }
}



export default profileReducer;