import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    projectId: "xxx"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
