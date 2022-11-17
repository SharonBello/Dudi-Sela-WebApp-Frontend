


import {httpService} from './http.service.js';

export const authSignout = () => {
    return httpService.post('auth/signout');    
}
