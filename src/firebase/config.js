import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDVyjgCTA1Px423XYhhQg8jBZmy-OEKvoQ",
    authDomain: "chat-app-daca6.firebaseapp.com",
    projectId: "chat-app-daca6",
    storageBucket: "chat-app-daca6.appspot.com",
    messagingSenderId: "829768578646",
    appId: "1:829768578646:web:2fe31f6095896bae25adf7",
    measurementId: "G-5X6SW1BBTS"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// sử dụng emulators local
if (window.location.hostname === 'localhost') {
    auth.useEmulator('http://localhost:9099')
    db.useEmulator('localhost', '8080')
}

export { db, auth };
export default firebase;