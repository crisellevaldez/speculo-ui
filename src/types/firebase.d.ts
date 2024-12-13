import { FirebaseApp } from "firebase/app";
import { Analytics } from "firebase/analytics";

declare global {
  interface Window {
    firebaseApp?: FirebaseApp;
    firebaseAnalytics?: Analytics;
  }
}
