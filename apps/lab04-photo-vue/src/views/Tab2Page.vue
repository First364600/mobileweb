<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
        <ion-title size="small">โดย วัชรวิศว์ ชัยปลื้ม รหัส 663380023-1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

    <ion-grid>
      <ion-row>
        <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
          <ion-img :src="photo.webviewPath"></ion-img>
        </ion-col>
      </ion-row>
    </ion-grid>

      
      <!-- <ExploreContainer name="Tab 2 page" /> -->
    </ion-content>
    <ion-fab vertical="bottom" horizontal="center" slot="fixed">
      <ion-fab-button @click="addNewToGallery()">
        <ion-icon :icon="camera"></ion-icon>
      </ion-fab-button>
    </ion-fab>

  </ion-page>
</template>

<script setup lang="ts">
import { camera, trash, close } from 'ionicons/icons';
// import {
//     IonPage,
//     IonHeader,
//     IonFab,
//     IonFabButton,
//     IonIcon,
//     IonToolbar,
//     IonTitle,
//     IonContent,
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonImg,
// } from '@ionic/vue';

import { IonPage, IonHeader, IonFabButton, IonIcon, IonTitle, IonToolbar, IonContent } from '@ionic/vue';
// import ExploreContainer from '@/components/ExploreContainer.vue';

import { usePhotoGallery } from '@/composables/usePhotoGallery';
const { addNewToGallery, photos } = usePhotoGallery();

</script>
