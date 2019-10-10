import axios from 'axios';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const UsersRepository = RepositoryFactory.get('users');


const state = {
    user: {},
    token: null
};

const getters = {
    user: state => state.user,
    token: state => state.token
};

const actions = {
    async fetchCurrentUser({ commit }) {     
        const token = localStorage.getItem('token'); 
        var config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        let response;
        try{
            response = await axios.post(
                'http://localhost:8000/api/auth/me',
                {},
                config
                
            );
            commit('setUser', response.data);

        }catch(e){
            
        }    
    },
    async loginUser({ commit }, user) {

        let response;
        try{
            response = await axios.post(
                'http://localhost:8000/api/auth/login',user
            );

        }catch(e){
            
        }
        commit('loginUser', response.data);
    },
    async registerUser({ commit }, user){
        
        let response;
        try{
            response = await axios.post(
                'http://localhost:8000/api/auth/register',user
            );

        }catch(e){
            
        }
        commit('registerUser', response.data);
    },

    async logoutUser( { commit }) {

        const token = localStorage.getItem('token'); 
        var config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        let response;
        try{
            response = await axios.post(
                'http://localhost:8000/api/auth/logout',
                {},
                config
            );
            
        }catch(e){

        }
        commit('logoutUser', response.data);
        
    }
};

const mutations = {
    setUser: (state, data) => {
        state.user = data;
    },
    loginUser: (state, data) => {
        state.token = data.access_token;        
        state.user = data.user;
        localStorage.setItem('token',data.access_token);
    },
    logoutUser: (state) => {
        state.token = null;
        state.user = {};
        localStorage.clear();
    },
    registerUser: (state, data) => {
        state.token = data.access_token,
        state.user = data.user,
        localStorage.setItem('token',data.access_token);

    }
};

export default{
    state,
    getters,
    actions,
    mutations
}