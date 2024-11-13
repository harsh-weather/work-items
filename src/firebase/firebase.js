import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push } from "firebase/database";
// import { firebaseConfig } from "../config/firebaseConfig";
// import firebase from "firebase/compat/app";
 
const firebaseConfig = {
    apiKey: "AIzaSyAQYF5rVacapFF8ntZ5wTFEyfLtQ8dYf4w",
    authDomain: "work-items-5e544.firebaseapp.com",
    databaseURL: "https://work-items-5e544-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "work-items-5e544",
    storageBucket: "work-items-5e544.firebasestorage.app",
    messagingSenderId: "779474467909",
    appId: "1:779474467909:web:1ae84e71bee1d43c91772c"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db, ref, set, get, push };