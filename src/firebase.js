// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Step 1: Config
const firebaseConfig = {
  apiKey: "AIzaSyAioqVCFNxCECJTlTUIv5FGfgbL1qQvmvE",
  authDomain: "candy-delivery-app.firebaseapp.com",
  projectId: "candy-delivery-app",
  storageBucket: "candy-delivery-app.firebasestorage.app",
  messagingSenderId: "59910832334",
  appId: "1:59910832334:web:0ab2db3194475636f8109f"
};

// ✅ Step 2: Initialize Firebase core
const app = initializeApp(firebaseConfig);

// ✅ Step 3: Firestore w/ persistent cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

// ✅ Step 4: Auth setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Step 5: Export LAST
export { auth, provider, db };
