import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    "apiKey": "AIzaSyCYdlPEQSYi6f2oeIQqygaRXEq8Jn7-6zg",
    "authDomain": "sela-flutter-auth.firebaseapp.com",
    "projectId": "sela-flutter-auth",
    "storageBucket": "sela-flutter-auth.appspot.com",
    "messagingSenderId": "458892736143",
    "appId": "1:458892736143:web:2fbadbd58bc980051c22fa"
}




export const authListener = () => {
    const auth = getAuth(initializeApp(firebaseConfig));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("User is signed in", uid)
        // ...
      } else {
        // User is signed out
        // ...
        console.log("User is signed out")
      }
    });
}
