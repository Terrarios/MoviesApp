import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyB6Ut-hnuqvQNdrj-Nh6mxn8MCCegbFNLM",
  authDomain: "mentos-app.firebaseapp.com",
  projectId: "mentos-app",
  storageBucket: "mentos-app.appspot.com",
  messagingSenderId: "26220463846",
  appId: "1:26220463846:web:3600e43eb1b0cb5d0d9d27",
};

// Initialize Firebase
initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const app2 = initializeApp(
  {
    databaseURL: "https://mentos-app-default-rtdb.firebaseio.com/",
  },
  "app2"
);

const database1 = getDatabase(app2);

const db = firebase;
const provider = new GoogleAuthProvider();



const dbRef = ref(getDatabase());

export {
  db,
  firebase,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  signOut,
};
