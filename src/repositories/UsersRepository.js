import Repository from './Repository';

const resource = '/auth';

class UsersRepository extends Repository{
    login(user) {
        return this.getApiClient().post(`${resource}/login`, user);
    }

    register(user) {
        return this.getApiClient().post(`${resource}/register`, user);
    }

    fetchCurrentUser() {
        return this.getApiClient().post(`${resource}/me`);
    }

    logoutUser() {
        return this.getApiClient().post(`${resource}/logout`);
    }
}


export default UsersRepository;