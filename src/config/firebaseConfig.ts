/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDXKbx634X3Q8dcMiXjHseVzQiAFMvmSdY",
  authDomain: "reputa360.firebaseapp.com",
  projectId: "reputa360",
  storageBucket: "reputa360.appspot.com",
  messagingSenderId: "37758184858",
  appId: "1:37758184858:web:1d40d66b1441f2bf6f9e23",
  measurementId: "G-9MR1JLWZ81",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
