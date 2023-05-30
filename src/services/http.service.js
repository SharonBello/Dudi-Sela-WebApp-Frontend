import Axios from 'axios'
import { auth } from '../services/user.service.js'
import { UserRoles } from '../pages/club-manager/club-manager/club-helper.jsx'


const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : 'http://localhost:4000/'

let axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data, role= UserRoles[0]) {
        return ajax(endpoint, 'GET', data, role)
    },
    post(endpoint, data, role= UserRoles[0]) {
        return ajax(endpoint, 'POST', data, role)
    },
    put(endpoint, data, role= UserRoles[0]) {
        return ajax(endpoint, 'PUT', data, role)
    },
    delete(endpoint, data, role= UserRoles[0]) {
        return ajax(endpoint, 'DELETE', data, role)
    }
}

async function ajax(endpoint, method = 'GET', data, role) {
    try {
        let res
        if (auth && auth.currentUser) {
            const accessToken = await auth.currentUser.getIdToken()

            if (method === 'GET') {
                res = await axios.get(`${BASE_URL}${endpoint}`, { headers: { 'AuthToken': accessToken, 'role': role } })
            }
            if (method === 'POST') {
                res = await axios.post(`${BASE_URL}${endpoint}`, data, { headers: { 'AuthToken': accessToken, 'role': role } })
            }
            if (method === 'DELETE') {
                res = await axios.delete(`${BASE_URL}${endpoint}`, {headers: {
                        'AuthToken': accessToken,
                        'role': role
                    },
                    data: data
                });
            }
        }
        return res
    } catch (err) {
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}