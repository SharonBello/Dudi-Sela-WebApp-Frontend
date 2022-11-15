


import axios from 'axios';

export const authSignout = () => {
    return axios.post('http://localhost:3030/signout');
}
