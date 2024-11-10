import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADLLPLdZ3lFBWGZrfvsYTN4YjGb5QRzjs",
  authDomain: "myapp-63c09.firebaseapp.com",
  projectId: "myapp-63c09",
  storageBucket: "myapp-63c09.appspot.com",
  messagingSenderId: "1097198899637",
  appId: "1:1097198899637:web:a3611558118cbdc1cdc9fc",
  measurementId: "G-23WYWE52W3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);