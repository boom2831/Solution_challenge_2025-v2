import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCa-CJvYBe4ZJCF_qaQy_J7Oq7NsgsFQJc",
    authDomain: "life-orbit-app.firebaseapp.com",
    projectId: "life-orbit-app",
    storageBucket: "life-orbit-app.firebasestorage.app",
    messagingSenderId: "956429524876",
    appId: "1:956429524876:web:9297b36169be13ea1dc0a9",
    measurementId: "G-6JFJ9G78Z6"
  };

export const app = initializeApp(firebaseConfig);