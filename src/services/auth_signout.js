


import axios from 'axios';

export const authSignout = () => {
    axios.post('http://localhost:4000/signout')
    .then(function (response) {
      console.log(response);
    })
}
