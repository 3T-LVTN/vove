import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import * as process from "process";

export const firebaseConfig = {
  apiKey: process.env["NX_FIREBASE_API_KEY"],
  authDomain: process.env["NX_AUTH_DOMAIN"],
  projectId: process.env["NX_PROJECT_ID"],
  storageBucket: process.env["NX_STORAGE_BUCKET"],
  messagingSenderId: process.env["NX_MESSAGING_SENDER_ID"],
  appId: process.env["NX_APP_ID"]
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export {firebase}
