import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCTovTXros2NLNbON26jpfkcX3fyxngL0",
  authDomain: "speculo-staging.firebaseapp.com",
  projectId: "speculo-staging",
  storageBucket: "speculo-staging.firebasestorage.app",
  messagingSenderId: "70707136872",
  appId: "1:70707136872:web:2a86dd8c3d03f500b0eedd",
  measurementId: "G-Z28L7Y77KS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
