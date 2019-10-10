import axios from 'axios';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const usersRepo = RepositoryFactory.get('users');


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
        let response;
        try{
            response = await usersRepo.fetchCurrentUser();
            commit('setUser', response.data);

        }catch(e){
            
        }    
    },
    async loginUser({ commit }, user) {

        let response;
        try{
            response = await usersRepo.login(user);

        }catch(e){
            
        }
        commit('loginUser', response.data);
    },
    async registerUser({ commit }, user){
        
        let response;
        try{
            response = await usersRepo.register(user);

        }catch(e){
            
        }
        commit('registerUser', response.data);
    },

    async logoutUser( { commit }) {


        let response;
        try{
            response = await usersRepo.logoutUser();
            
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