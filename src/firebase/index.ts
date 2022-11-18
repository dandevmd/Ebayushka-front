// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7CzOzL9tPMwhM8tgsY2V-QJPMSgdW5Aw",
  authDomain: "ebayushka-d885a.firebaseapp.com",
  projectId: "ebayushka-d885a",
  storageBucket: "ebayushka-d885a.appspot.com",
  messagingSenderId: "130478534998",
  appId: "1:130478534998:web:a355469091a4d1b7e666f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const gProvider = new GoogleAuthProvider();

//logout from ff
export const logoutFromFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
