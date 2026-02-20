import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonButton, IonAvatar, useIonViewWillEnter, useIonRouter,
  IonItem, IonLabel
} from '@ionic/react';
import { authService } from '../auth/auth-service';
import { AuthUser } from '../auth/auth-interface';

const Tab1: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useIonRouter();

  // ทำงานทุกครั้งที่เข้าหน้า Tab1 (เหมือน ionViewWillEnter ใน Vue)
  useIonViewWillEnter(() => {
    const fetchUser = async () => {
      const u = await authService.getCurrentUser();
      setUser(u);
    };
    fetchUser();
  });

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login', 'root');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="ion-padding">
          {user ? (
            <IonCard>
              <div className="ion-text-center ion-padding-top">
                <IonAvatar style={{margin: '0 auto', width: '100px', height: '100px'}}>
                  <img src={user.photoUrl || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="profile" />
                </IonAvatar>
              </div>

              <IonCardHeader>
                <IonCardTitle className="ion-text-center">{user.displayName || 'User'}</IonCardTitle>
                <IonCardSubtitle className="ion-text-center">{user.uid}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                {user.email && (
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Email</h3>
                      <p>{user.email}</p>
                    </IonLabel>
                  </IonItem>
                )}
                {user.phoneNumber && (
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Phone</h3>
                      <p>{user.phoneNumber}</p>
                    </IonLabel>
                  </IonItem>
                )}
                
                <IonButton expand="block" color="danger" onClick={handleLogout} className="ion-margin-top">
                  Logout
                </IonButton>
              </IonCardContent>
            </IonCard>
          ) : (
            <p className="ion-text-center">Loading User...</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;