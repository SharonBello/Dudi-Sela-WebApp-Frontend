import Axios from 'axios'
import { auth } from '../services/user.service.js'
import { UserRoles } from '../pages/club-manager/club-manager/club-helper.jsx'
import { getAuth } from "firebase/auth";


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
        const accessToken = sessionStorage.getItem("accessToken")
        if (method === 'GET' && accessToken) {
            res = await axios.get(`${BASE_URL}${endpoint}`, { headers: { 'AuthToken': accessToken, 'role': role } })
        }
        if (method === 'POST') {
            if (endpoint.indexOf('signin')!==-1 || endpoint.indexOf('signup')!==-1 || endpoint.indexOf('signout')!==-1 || endpoint.indexOf('clubuser')!==-1) {
                res = await axios.post(`${BASE_URL}${endpoint}`, data, { headers: { 'role': role } })
            } else if (accessToken){
                res = await axios.post(`${BASE_URL}${endpoint}`, data, { headers: { 'AuthToken': accessToken, 'role': role } })
            }
        }
        if (method === 'DELETE' && accessToken) {
            res = await axios.delete(`${BASE_URL}${endpoint}`, {headers: {
                    'AuthToken': accessToken,
                    'role': role
                },
                data: data
            });
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