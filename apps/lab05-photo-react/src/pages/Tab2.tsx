import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { camera } from 'ionicons/icons';
import './Tab2.css';

const Tab2: React.FC = () => {

  const { photos, addNewToGallery } = usePhotoGallery();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>            
          <IonTitle size="small">Lab 05 - โดย วัชรวิศว์ ชัยปลื้ม รหัส 663380023-1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
            <IonTitle size="small">Lab 05 - โดย วัชรวิศว์ ชัยปลื้ม รหัส 663380023-1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            {photos.map((photo) => (
              <IonCol size='6' key={photo.filepath}>
                <IonImg src={photo.webviewPath}></IonImg>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton onClick={() => addNewToGallery()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
