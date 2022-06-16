import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDAzOrbyiEOcw8x36xLlj0YklXm3xpENoU",
  authDomain: "coreui-ea238.firebaseapp.com",
  projectId: "coreui-ea238",
  storageBucket: "coreui-ea238.appspot.com",
  messagingSenderId: "9194081102",
  appId: "1:9194081102:web:86254ef35792e670cfec1f",
  measurementId: "G-F91WGH8QTE"
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}