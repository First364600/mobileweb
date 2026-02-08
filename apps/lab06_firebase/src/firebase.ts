import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "d253e1ad0e72421cc372e814caa3bf87b3747333",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "mobile-and-web-7a140"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);