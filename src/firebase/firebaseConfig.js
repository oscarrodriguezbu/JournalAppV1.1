import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDTNMPrYDxyRGXIAVVhcCi5GbbybOtErS4",
    authDomain: "react-app-curso-7e102.firebaseapp.com",
    projectId: "react-app-curso-7e102",
    storageBucket: "react-app-curso-7e102.appspot.com",
    messagingSenderId: "45865240216",
    appId: "1:45865240216:web:312d11be04a9b66e2932ed"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore(); //es la base de datos
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  //se pueden colocar mas como git, twitter etc

  export {  
    db,
    googleAuthProvider,
    firebase
  }

