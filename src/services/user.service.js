import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { store } from '../store/rootReducer.js'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
// import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGED_USER = 'loggedUser'
const STORAGE_KEY_LOGGED = 'loggedUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    onUserUpdate,
    getGoogleUser,
    signUpGoogle,
}

window.userService = userService
function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

async function getGoogleUser(googleId) {
    try {
        const user = await httpService.get(`user/google/${googleId}`);
        if (user) {
            sessionStorage.setItem(STORAGE_KEY_LOGGED, JSON.stringify(user));
        }
        return user;
    } catch (err) {
        return false;
    }
}

function onUserUpdate(user) {
    // showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    const isSeller = user.isSeller
    user = await httpService.put(`user/${user._id}`, isSeller)
    // Handle case in which admin updates other user's details
    if (getLoggedUser()._id === user._id) {
        saveLocalUser(user)
    }
    return user
}

async function login(userCred) {
    try {
        let user = await httpService.post('auth/login', userCred)
        if (user) {
            _handleLogin(user)
            return user
        }
    } catch (err) {
        throw err
    }
}

async function signUpGoogle(user) {
    const userToAdd = {
        firstName: user.firstName,
        lastName: user.lastName,
        imgUrl: user.picture,
        email: user.email,
        password: user.password
    }
    let userAdded = await httpService.post('auth/google', userToAdd)
    _handleLogin(userAdded)
    return userAdded
}

async function signup(userCred) {
    try {
        let users = await httpService.get('user')
        const isUserExist = users.find(user => user.email === userCred.email && user.password === userCred.password)
        if (isUserExist) {
            const err = new Error('User already exist')
            throw err
        }

        const user = await httpService.post('auth/signup', userCred)
        _handleLogin(user)
        return user
    } catch (err) {
        console.dir(err)
        throw err
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_USER)
    return await httpService.post('auth/logout')
}

function _handleLogin(user) {
    const miniUser = { _id: user._id, userName: user.userName, imgUrl: user.imgUrl, isSeller: user.isSeller }
    sessionStorage.setItem(STORAGE_KEY_LOGGED, JSON.stringify(miniUser))
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(user))
    return user
}

function getLoggedUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER))
}


