import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from "firebase/storage"


const firebaseConfig = initializeApp({
  apiKey : "AIzaSyCmvkOXN_Kfvb98oNrXsaCUjYUZ21urSFw" , 
  authDomain : "instagram-1734d.firebaseapp.com" , 
  databaseURL : "https://instagram-1734d-default-rtdb.firebaseio.com" , 
  projectId : "instagram-1734d" , 
  storageBucket : "instagram-1734d.appspot.com" , 
  messagingSenderId : "647331247611" , 
  appId : "1:647331247611:web:c0660c5375a0f4126e075e" 
});

  const db = getFirestore(firebaseConfig);
const auth = getAuth(firebaseConfig)
const storage = getStorage(firebaseConfig)
export { db, auth, storage };
