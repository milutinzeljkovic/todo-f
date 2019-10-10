import axios from 'axios';

const baseDomain = 'http://localhost:8000';
const baseURL = `${baseDomain}/api`;

const token = localStorage.getItem('token');
 
const config = {
    headers: {Authorization: `Bearer ${token}`}
};

export default axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${token}`}
});