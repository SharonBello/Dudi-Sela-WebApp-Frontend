import { httpService } from './http.service.js'
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import getFirebaseConfig from './firebase.js';
export const STORAGE_KEY_LOGGED_USER = 'loggedUser'

export const userService = {
    login,
    authSignout,
    signup,
    getLoggedUser,
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
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_USER)
    return await httpService.post('auth/signout')
}

function _handleLogin(user) {
    if (user.uid) {
        const miniUser = { email: user.email, uid: user.uid}
        sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(miniUser))
        window.dispatchEvent(new Event("storage"));
    }
}

function getLoggedUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER))
}

export const auth = getAuth(initializeApp(getFirebaseConfig()))

function handleCredentialResponse(response) {
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    signInWithCredential(auth, credential)
        .then((res) => {
            _handleLogin(res.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, errorMessage, email, credential);
        })
}


