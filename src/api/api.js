import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '690c593f-030a-42e9-b71f-2d057ff9ed34'
    },
});



export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
}



export const usersAPI = {
    getUsers(pageNumber = 1, countUsers = 6) {
        return instance.get(`users?page=${pageNumber}&count=${countUsers}`);
    },

    followUser(userId) {
        return instance.post(`/follow/${userId}`).then(response => response.data);
    },

    unFollowUser(userId) {
        return instance.delete(`/follow/${userId}`).then(response => response.data);
    },
}

export const authAPI = {

    loginIn(email, password, rememberMe) {
        return instance.post(`/auth/login`, {email, password, rememberMe}).then(response => response.data);
    },

    loginOut() {
        return instance.delete(`/auth/login`).then(response => response.data);
    },
    
    getUserData() {
        return instance.get(`auth/me`).then(response => response.data);
    }
}