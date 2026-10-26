import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCybgQcRQmmyWipJO02KJ1_XisRffnKOIc",
  authDomain: "educentral-vl7k8.firebaseapp.com",
  databaseURL: "https://educentral-vl7k8-default-rtdb.firebaseio.com",
  projectId: "educentral-vl7k8",
  storageBucket: "educentral-vl7k8.firebasestorage.app",
  messagingSenderId: "1031484231297",
  appId: "1:1031484231297:web:0e7ad23127779e60fdc780"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

