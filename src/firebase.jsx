import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCpdCj5BrfAY0xzvLVCLT5EaE3esw309EU",
    authDomain: "react-porj.firebaseapp.com",
    projectId: "react-porj",
    storageBucket: "react-porj.firebasestorage.app",
    messagingSenderId: "729219163690",
    appId: "1:729219163690:web:7de49c10e11c7bd8ce8553",
    measurementId: "G-0P5LSG2WTZ"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)