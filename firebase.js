import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpxi3BSqLOr0lJ4-xyh9M2bZAn2FsSx6M",
  authDomain: "krishi-seva-012.firebaseapp.com",
  projectId: "krishi-seva-012",
  storageBucket: "krishi-seva-012.appspot.com",
  messagingSenderId: "464899743299",
  appId: "1:464899743299:web:df4c00544e39080c6d3ef6",
  measurementId: "G-SC9PQF1LVD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
