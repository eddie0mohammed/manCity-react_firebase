import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwM97r61MbpR9Q03Q8aKQkE5crDgc7-E4",
    authDomain: "mancity-react-1.firebaseapp.com",
    databaseURL: "https://mancity-react-1.firebaseio.com",
    projectId: "mancity-react-1",
    storageBucket: "",
    messagingSenderId: "264670132049",
    appId: "1:264670132049:web:ae805cd9f47dbc8d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


  // instance of database
  const firebaseDB = firebase.database();

const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');

export {
    firebase,
    firebaseMatches,
    firebasePromotions
}

   