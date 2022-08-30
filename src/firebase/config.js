import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDpSslhIvPHKZPJaos4dmwfplIB-w0HvQM",
    authDomain: "record-app-a0e38.firebaseapp.com",
    projectId: "record-app-a0e38",
    storageBucket: "record-app-a0e38.appspot.com",
    messagingSenderId: "848339088670",
    appId: "1:848339088670:web:534ac55c6c3819ce38850f"
  };

  // firebase init
  initializeApp(firebaseConfig);

  // init firestore
  const db = getFirestore();

  // init firebase auth
  const auth = getAuth();

  // init firebase storage
  const storage = getStorage();

  // timestamp
  const timestamp = serverTimestamp();

  export { db, auth, storage, timestamp }