


import axios from 'axios';

export const authSignout = () => {
    return axios.post('http://localhost:4000/signout');
}
