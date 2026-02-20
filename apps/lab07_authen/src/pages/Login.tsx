import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonInput, IonButton, IonItem, IonLabel, IonCard, IonCardContent, 
  useIonRouter, useIonLoading, useIonAlert
} from '@ionic/react';
import { authService } from '../auth/auth-service';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentAlert] = useIonAlert();

  // State สำหรับ Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  
  // State สำหรับ Phone Flow
  const [step, setStep] = useState<'LOGIN_SELECT' | 'PHONE_Input' | 'PHONE_OTP'>('LOGIN_SELECT');
  const [verificationId, setVerificationId] = useState('');

  // 1. Email Login
  const handleEmailLogin = async () => {
    try {
      await presentLoading();
      console.log('Attempting login with:', email); // Debug log
      await authService.loginWithEmailPassword({ email, password });
      console.log('Login success, navigating to /tab1'); // Debug log
      await dismissLoading();
      router.push('/tab1', 'root');
    } catch (error: any) {
      console.error('Login error:', error); // Debug log
      // ใช้ try-catch ครอบ dismissLoading เพื่อป้องกัน error กรณี loading ถูกปิดไปแล้ว
      try { await dismissLoading(); } catch (e) {}
      presentAlert({ header: 'Error', message: error.message || 'Login failed', buttons: ['OK'] });
    }
  };

  // 2. Google Login
  const handleGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
      router.push('/tab1', 'root');
    } catch (error: any) {
      presentAlert({ header: 'Error', message: error.message, buttons: ['OK'] });
    }
  };

  // 3. Phone Login Flow
  const sendOtp = async () => {
    try {
      await presentLoading();
      const res = await authService.startPhoneLogin({ phoneNumberE164: phoneNumber });
      setVerificationId(res.verificationId);
      await dismissLoading();
      setStep('PHONE_OTP');
    } catch (error: any) {
      try { await dismissLoading(); } catch (e) {}
      presentAlert({ header: 'Error', message: error.message, buttons: ['OK'] });
    }
  };

  const verifyOtp = async () => {
    try {
      await presentLoading();
      await authService.confirmPhoneCode({ verificationId, verificationCode: otp });
      await dismissLoading();
      router.push('/tab1', 'root');
    } catch (error: any) {
      try { await dismissLoading(); } catch (e) {}
      presentAlert({ header: 'Error', message: error.message, buttons: ['OK'] });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {/* Container สำหรับ reCAPTCHA (จำเป็นสำหรับ Web Phone Auth) */}
        <div id="recaptcha-container"></div>

        {step === 'LOGIN_SELECT' && (
          <>
            <IonCard>
              <IonCardContent>
                <h2>Email Login</h2>
                <IonItem>
                  <IonInput label="Email" labelPlacement="floating" value={email} onIonInput={e => setEmail(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonInput label="Password" type="password" labelPlacement="floating" value={password} onIonInput={e => setPassword(e.detail.value!)} />
                </IonItem>
                <IonButton expand="block" onClick={handleEmailLogin} className="ion-margin-top">Login with Email</IonButton>
              </IonCardContent>
            </IonCard>

            <IonButton expand="block" color="danger" onClick={handleGoogleLogin}>
              Login with Google
            </IonButton>
            
            <IonButton expand="block" color="success" onClick={() => setStep('PHONE_Input')}>
              Login with Phone
            </IonButton>
          </>
        )}

        {step === 'PHONE_Input' && (
          <IonCard>
            <IonCardContent>
              <h2>Phone Login</h2>
              <IonItem>
                <IonInput 
                  label="Phone Number (+66...)" 
                  labelPlacement="floating" 
                  placeholder="+66812345678"
                  value={phoneNumber} 
                  onIonInput={e => setPhoneNumber(e.detail.value!)} 
                />
              </IonItem>
              <IonButton expand="block" onClick={sendOtp} className="ion-margin-top">Send OTP</IonButton>
              <IonButton fill="clear" onClick={() => setStep('LOGIN_SELECT')}>Back</IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {step === 'PHONE_OTP' && (
          <IonCard>
            <IonCardContent>
              <h2>Enter OTP</h2>
              <IonItem>
                <IonInput 
                  label="OTP Code" 
                  labelPlacement="floating" 
                  value={otp} 
                  onIonInput={e => setOtp(e.detail.value!)} 
                />
              </IonItem>
              <IonButton expand="block" onClick={verifyOtp} className="ion-margin-top">Verify</IonButton>
            </IonCardContent>
          </IonCard>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Login;
