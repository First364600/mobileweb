import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "xxx"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
