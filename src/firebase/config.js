import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAzImkXb9tFDTKfVn8lwdXkKlMTGRqGibs",
    authDomain: "mcewan-rn-clase3.firebaseapp.com",
    projectId: "mcewan-rn-clase3",
    storageBucket: "mcewan-rn-clase3.firebasestorage.app",
    messagingSenderId: "357246266386",
    appId: "1:357246266386:web:bb1b085978a18998997ccb",
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
