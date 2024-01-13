import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDlBscTMQtCfT3JEYMAdY8IsMHvH8KxbL4",
    authDomain: "movieapp-d8772.firebaseapp.com",
    projectId: "movieapp-d8772",
    storageBucket: "movieapp-d8772.appspot.com",
    messagingSenderId: "299369385536",
    appId: "1:299369385536:web:e43cca2ca33e2641f159a5",
    measurementId: "G-655SRJD51L"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
