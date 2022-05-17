import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyD2hpDb5EuGJkprqnMigp0J7BDEy9JNT8U",
  authDomain: "epibug-91de1.firebaseapp.com",
  databaseURL: "https://epibug-91de1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "epibug-91de1",
  storageBucket: "epibug-91de1.appspot.com",
  messagingSenderId: "89448666876",
  appId: "1:89448666876:web:e53930100aab24be74e979",
  measurementId: "G-CY8P6EEVR5"
};

export const app = initializeApp(firebaseConfig);
