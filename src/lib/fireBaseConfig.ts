import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: 'tech-updates-265e8',
  storageBucket: 'tech-updates-265e8.appspot.com',
  messagingSenderId: '352057770441',
  appId: '1:352057770441:web:5be5f0320e5f06044d6818',
  measurementId: 'G-8MRQ4Z82L0',
}

let app
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig)
}

const auth = app ? getAuth(app) : null
const provider = new GoogleAuthProvider()

export { auth, provider, signInWithPopup, signOut }
