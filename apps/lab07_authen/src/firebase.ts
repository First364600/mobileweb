import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEx1Hgtn0kcxElG3RzjmPl5PqPjVmn_Bs",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    projectId: "mobile-and-web-7a140"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);