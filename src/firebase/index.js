
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzhJJTfoBnT2fYWd-OCxUVn2fgJxJ2kBo",
  authDomain: "telemedicine-2c770.firebaseapp.com",
  projectId: "telemedicine-2c770",
  storageBucket: "telemedicine-2c770.appspot.com",
  messagingSenderId: "776723924366",
  appId: "1:776723924366:web:a599ad1cdfcbff535710df",
  measurementId: "G-0BGS901P3D"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else{
    localStorage.removeItem('user')
  }

  
}
) 


const analytics = getAnalytics(app);