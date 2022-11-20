import { httpService } from './http.service.js'
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import getFirebaseConfig from '../services/key.service.js'

const STORAGE_KEY_LOGGED_USER = 'loggedUser'
const STORAGE_KEY_LOGGED = 'loggedUser'

export const userService = {
    login,
    authSignout,
    signup,
    getLoggedUser,
    saveLocalUser,
    handleCredentialResponse
}

window.userService = userService

async function login(userCred) {
    try {
        const loggedUser = await httpService.post('auth/signin', userCred)
        if (loggedUser) {
            _handleLogin(userCred)
            return loggedUser
        }
    } catch (err) {
        throw err
    }
}

async function signup(payload) {
    try {
        const user = await httpService.post('auth/signup', payload)
        _handleLogin(payload)
        return user
    } catch (err) {
        throw err
    }
}

async function authSignout() {
    localStorage.removeItem(STORAGE_KEY_LOGGED_USER)
    return await httpService.post('auth/signout')
}

function _handleLogin(user) {
    const miniUser = { email: user.email, uid: user.uid}
    localStorage.setItem(STORAGE_KEY_LOGGED, JSON.stringify(miniUser))
}

function saveLocalUser(user) {
    localStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(user))
    return user
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGED_USER))
}

function handleCredentialResponse(response) {
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);
    const auth = getAuth(initializeApp(getFirebaseConfig()))

    signInWithCredential(auth, credential)
        .then((res) => {
            _handleLogin(res.user)
            // console.log("🚀 ~ file: user.service.js ~ line 135 ~ .then ~ res.user", res.user)
            document.location.reload('http://localhost:3000/signin')
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, errorMessage, email, credential);
        })
}


