import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  updatePassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  increment,
  serverTimestamp,
} from "firebase/firestore";
// import { FieldValue, arrayUnion } from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDO_7SCw70wc3VuvG0gNejmcRAjxNwlBo",
  authDomain: "easyfit-44395.firebaseapp.com",
  projectId: "easyfit-44395",
  storageBucket: "easyfit-44395.appspot.com",
  messagingSenderId: "943490645862",
  appId: "1:943490645862:web:2692366f8cb828d49f12a7",
  measurementId: "G-LKCRX5VGC6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// const dBase = firebase.firestore();
// const authe = firebase.auth();

const analytics = getAnalytics(app);
const auth = getAuth(app);
var db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  analytics,
  auth,
  addDoc,
  getDocs,
  collection,
  db,
  ref,
  doc,
  getDoc,
  setDoc,
  storage,
  query,
  where,
  orderBy,
  increment,
  arrayRemove,
  deleteDoc,
  updateDoc,
  onSnapshot,
  uploadBytes,
  deleteObject,
  Timestamp,
  serverTimestamp,
  arrayUnion,
  updatePassword,
  setPersistence,
  getDownloadURL,
  uploadBytesResumable,
  browserSessionPersistence,
};
