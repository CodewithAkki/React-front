// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-_1C14QV8ZIQd-lkDfdSd-CTkf13SUfBQ",
  authDomain: "react-firebase-storage-iopp.firebaseapp.com",
  projectId: "react-firebase-storage-iopp",
  storageBucket: "react-firebase-storage-iopp.appspot.com",
  messagingSenderId: "521060076748",
  appId: "1:521060076748:web:f3c962a5455d31e6450669",
  measurementId: "G-7NLSJ0W58V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);