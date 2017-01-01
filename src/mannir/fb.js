import firebase from 'firebase'
 
var config = {
  apiKey: "AIzaSyCnPAV6_ixdqaslyPyucNHpoUqdrKrxUk0",
  authDomain: "manniredu.firebaseapp.com",
  databaseURL: "https://manniredu.firebaseio.com",
  projectId: "manniredu",
  storageBucket: "manniredu.appspot.com",
  messagingSenderId: "937859403775"
};
var fb = firebase.initializeApp(config);
 
export default fb;