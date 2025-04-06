import { initializeApp } from 'firebase/app';
import { createContext, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, set, ref, get, onValue } from 'firebase/database';

const firebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCa-CJvYBe4ZJCF_qaQy_J7Oq7NsgsFQJc",
  authDomain: "life-orbit-app.firebaseapp.com",
  projectId: "life-orbit-app",
  storageBucket: "life-orbit-app.firebasestorage.app",
  messagingSenderId: "956429524876",
  appId: "1:956429524876:web:9297b36169be13ea1dc0a9",
  measurementId: "G-6JFJ9G78Z6",
  databaseURL: "https://life-orbit-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);
export const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => {
  const context = useContext(firebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({children}) => {

  const signinWithGoogle = async (name, email, password) =>{
      try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const user = result.user;
        const userRef = ref(database, `users/${user.uid}`);
        await set(userRef, {
          name:user.displayName, 
          email:user.email, 
          createdAt: { ".sv": "timestamp" }
        });
        return user;
      } catch(error){
        throw error;
      }
  }

  const signupUserWithEmailAndPassword = async (name, email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      const user = userCredentials.user;

      await set(ref(database, "users/" + user.uid), {
        name: name,
        email: email,
        createdAt: { ".sv": "timestamp" }
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      const user = userCredentials.user;
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("User data from DB:", userData);
        return { user, userData };
      } else {
        console.log("No data found for user in database.");
        return { user, userData: null };
      }
    } catch (error) {
      throw error;
    }
  };

  const getCurrentUser = (callback) => {
    return onAuthStateChanged(FirebaseAuth, callback);
  };

  const updateUserLikedCourses = async (userId, courseId, isLiked) => {
    try {
      const courseRef = ref(database, `liked_courses/${userId}/${courseId}`);
      if (isLiked) {
        await set(courseRef, true);
      } else {
        await set(courseRef, null); 
      }
    } catch (error) {
      throw error;
    }
  };


  const getUserLikedCourses = (userId) => {
    return new Promise((resolve, reject) => {
      const coursesRef = ref(database, `liked_courses/${userId}`);
      onValue(coursesRef, (snapshot) => {
        resolve(snapshot.exists() ? snapshot.val() : {});
      }, (error) => {
        reject(error);
      });
    });
  };
  

  return (
    <firebaseContext.Provider value={{ 
      signinUserWithEmailAndPassword, 
      signupUserWithEmailAndPassword,
      signinWithGoogle,
      getCurrentUser,
      updateUserLikedCourses,
      getUserLikedCourses
      }}>
      {children}
    </firebaseContext.Provider>
  );
};