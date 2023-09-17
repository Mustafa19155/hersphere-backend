// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDvPl-a7ljKZjCU9rLF4VU3-yQmlzEFTnU',
  authDomain: 'hersphere-d67c8.firebaseapp.com',
  projectId: 'hersphere-d67c8',
  storageBucket: 'hersphere-d67c8.appspot.com',
  messagingSenderId: '625142980869',
  appId: '1:625142980869:web:f776ccc13cc95588b5576c',
  measurementId: 'G-07QR5BS3LW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage, auth};
