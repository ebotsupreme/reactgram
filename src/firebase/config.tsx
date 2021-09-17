import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // storage for images
import { getFirestore, collection, addDoc } from "firebase/firestore"; // database
import { getAuth } from "firebase/auth"; // authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANlhNEdBOkobmYomY0J0YbXkl_jNzF7q0",
  authDomain: "reactgram-1241e.firebaseapp.com",
  projectId: "reactgram-1241e",
  storageBucket: "reactgram-1241e.appspot.com",
  messagingSenderId: "521870646125",
  appId: "1:521870646125:web:9ac180b0b035e4f8e45864",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const projectStorage = getStorage(firebaseApp);
const db = getFirestore();

const auth = getAuth();

export { projectStorage, db, auth, collection, addDoc };
