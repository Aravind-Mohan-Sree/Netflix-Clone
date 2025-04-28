import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATgMNtzHgRRr0HNKl1_mo_bOmwU5qHyko",
  authDomain: "olx-clone-db823.firebaseapp.com",
  projectId: "olx-clone-db823",
  storageBucket: "olx-clone-db823.firebasestorage.app",
  messagingSenderId: "336755333306",
  appId: "1:336755333306:web:06f6b377123b5af206ca83",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
