import axios from 'axios';

const api =  axios.create({
    baseURL: 'https://6540e73445bedb25bfc2d879.mockapi.io',
});

export default api;