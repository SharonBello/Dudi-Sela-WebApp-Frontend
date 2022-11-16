import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : 'http://localhost:4000/'

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
        return axios.post(`${BASE_URL}${endpoint}`, data)
    } catch (err) {
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}