// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0eP89vKnwKE7HtPTuCio8uP-zUWSlEO4",
  authDomain: "stargazer-e1cd8.firebaseapp.com",
  projectId: "stargazer-e1cd8",
  storageBucket: "stargazer-e1cd8.appspot.com",
  messagingSenderId: "472476932550",
  appId: "1:472476932550:web:5320583d19e2abd97d7ac7",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const storage = getStorage(app);

export { auth ,storage};
