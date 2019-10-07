import axios from 'axios';

const state = {
    user: {}
};

const getters = {
    getUser: state => state.user,
    getToken: state => state.token
};

const actions = {
    async fetchCurrentUser({ commit }) {
        //ovo iz local storage
        var config = {
            headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MDQ1MjQyMiwiZXhwIjoxNTcwNDU2MDIyLCJuYmYiOjE1NzA0NTI0MjIsImp0aSI6IkxYYTFxck42VTJwRTZoNXgiLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.hcfwt2WZ7WF19IxoFnvDXqzVd9nJSDyflzMp1ceIFvY'}
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

        user = {
            email: 'milutin@gmail.com',
            password: 'pass1234'
        }

        var bodyFormData = new FormData();
        bodyFormData.set('email', user.email);
        bodyFormData.set('password', user.password);

        let response;
        try{
            response = await axios.post(
                'http://localhost:8000/api/auth/login',bodyFormData
            );
        }catch(e){
            console.log('nije autorizovan');
        }

        commit('loginUser', response.data)
        
    }
};

const mutations = {
    setUser: (state, data) => {
        console.log(data);
    },
    loginUser: (state, data) => {
        state.token = data.access_token;
        
    }
};

export default{
    state,
    getters,
    actions,
    mutations
}