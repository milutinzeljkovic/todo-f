import Repository from './Repository';

const resource = '/auth';

export default {
    login(user) {
        return Repository.post(`${resource}/login`, user);
    },
    register(user) {
        return Repository.post(`${resource}/register`, user);
    },
    fetchCurrentUser() {
        return Repository.post(`${resource}/me`);
    },
    logoutUser() {
        return Repository.post(`${resource}/logout`);
    }
}