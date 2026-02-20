// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth } from "firebase/auth";
import { AuthUser, IAuthService, EmailPasswordCredentials, PhoneCredentials } from "./auth-interface";
import { 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithPhoneNumber, 
    ConfirmationResult
} from 'firebase/auth';

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

function mapUser(u: any): AuthUser {
    return {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoUrl: u.photoUrl,
    };
}

import { RecaptchaVerifier } from "firebase/auth";
import { code, map } from "ionicons/icons";

let verifier: RecaptchaVerifier | null = null;
let confirmationResult: ConfirmationResult | null = null;

const recaptchaContainerId: string = "recaptcha-container";

export function getRecaptchaVerifier(
    containerId: string
): RecaptchaVerifier {
    if (!verifier) {
        verifier = new RecaptchaVerifier(
            firebaseAuth,
            containerId,
            { size: "invisible" }
        );
    }
    return verifier;
}

export class FirebaseWebAuthService implements IAuthService {
    async getCurrentUser() {
        
        await firebaseAuth.authStateReady();

        return firebaseAuth.currentUser
            ? mapUser(firebaseAuth.currentUser)
            : null;
    }

    async loginWithEmailPassword(creds: EmailPasswordCredentials): Promise<AuthUser> {
        const r = await signInWithEmailAndPassword(
            firebaseAuth,
            creds.email,
            creds.password
        );
        return mapUser(r.user);
    }

    async loginWithGoogle(): Promise<AuthUser> {
        const provider = new GoogleAuthProvider();
        const r = await signInWithPopup(firebaseAuth, provider);
        return mapUser(r.user);
    }

    async logout() {
        await firebaseAuth.signOut();
    }

    async startPhoneLogin(creds: PhoneCredentials): Promise<{ verificationId: string; }> {
        const verifier = getRecaptchaVerifier(recaptchaContainerId);
        confirmationResult = await signInWithPhoneNumber(
            firebaseAuth,
            creds.phoneNumberE164,
            verifier
        );
        return { verificationId: confirmationResult.verificationId};
    }

    async confirmPhoneCode(payload: { verificationId: string; verificationCode: string; }): Promise<AuthUser> {
        if (!confirmationResult) {
            throw new Error("No confirmation result");
        }
        const r = await confirmationResult.confirm(payload.verificationCode);
        return mapUser(r.user);
    }
}
