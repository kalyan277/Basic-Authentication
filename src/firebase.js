import firebase from "firebase/app"
import "firebase/auth"

  const apiKey=process.env.REACT_APP_FIREBASE_API_KEY;
  const authDomain =process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
  const projectId= process.env.REACT_APP_FIREBASE_PROJECT_ID;
  const storageBucket=process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId=process.env.REACT_APP_FIREBASE_MESSAGING_SENDING_ID;
  const  appId=process.env.REACT_APP_FIREBASE_APP_ID;
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider =new firebase.auth.GoogleAuthProvider();