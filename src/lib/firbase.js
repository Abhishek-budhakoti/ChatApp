
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4G0HhN7CvoFkl7QOL0ie8jkB3h3zHtJ4",
  authDomain: "reactchat-ade1c.firebaseapp.com",
  projectId: "reactchat-ade1c",
  storageBucket: "reactchat-ade1c.firebasestorage.app",
  messagingSenderId: "1079250169983",
  appId: "1:1079250169983:web:ceb06712dc2fec8a22cf4a"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()