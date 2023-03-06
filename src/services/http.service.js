import Axios from 'axios'
import { auth } from '../services/user.service.js'


const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : 'http://localhost:8080/'

let axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        let res
        if (auth && auth.currentUser) {
            const accessToken = await auth.currentUser.getIdToken()

            if (method === 'GET') {
                res = await axios.get(`${BASE_URL}${endpoint}`, { headers: { 'AuthToken': accessToken } })
            }
            if (method === 'POST') {
                res = await axios.post(`${BASE_URL}${endpoint}`, data, { headers: { 'AuthToken': accessToken } })
            }
            if (method === 'DELETE') {
                res = await axios.delete(`${BASE_URL}${endpoint}`, {
                    headers: {
                        'AuthToken': accessToken
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