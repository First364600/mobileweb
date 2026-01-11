import { onMounted, ref, watch } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

import type { Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

export const usePhotoGallery = () => {
    const photos = ref<UserPhoto[]>([]);

    const PHOTO_STORAGE = 'photos';

    const addNewToGallery = async () => {
        const capturePhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });

        const fileName = Date.now() + '.jpeg';
        const savedImageFiles = await savePicture(capturePhoto, fileName);

        photos.value = [savedImageFiles, ...photos.value];
    };

    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        // const base64Data = (await convertBlobToBase64(blob)) as string;
        let base64Data: string | Blob;

        if (isPlatform('hybrid')) {
            const readFile = await Filesystem.readFile({
                path: photo.path!,
            });
            base64Data = readFile.data;
        } else {
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();
            base64Data = (await convertBlobToBase64(blob)) as string;
        }

        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        if (isPlatform('hybrid')) {
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            return {
                filepath: fileName,
                webviewPath: photo.webPath
            };
        }

        // return {
        //     filepath: fileName,
        //     webviewPath: photo.webPath,
        // };
    };

    const convertBlobToBase64 = (blob: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    };

    const cachePhotos = () => {
        Preferences.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(photos.value),
        });
    };

    const loadSaved = async () => {
        const photoList = await Preferences.get({ key: PHOTO_STORAGE });
        const photosInPrefereces = photoList.value ? JSON.parse(photoList.value) : [];
        
        if (!isPlatform('hybrid')) {
            for (const photo of photosInPrefereces) {
                const readFile = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: Directory.Data,
                });
                photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
            }
        }

        photos.value = photosInPrefereces;
    };
    onMounted(loadSaved);
    watch(photos, cachePhotos);

    return {
        addNewToGallery,
        photos,
    };
};

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}