import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  // Opción 1: Tomar foto nueva con la cámara
  async tomarFoto(): Promise<string | undefined> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Formato base64 fácil de guardar
        source: CameraSource.Camera
      });
      return image.dataUrl;
    } catch (error) {
      console.error('Error al tomar la foto', error);
      return undefined; // Si el usuario cancela, no rompemos la app
    }
  }

  // Opción 2: Seleccionar una foto existente de la galería
  async seleccionarDeGaleria(): Promise<string | undefined> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      return image.dataUrl;
    } catch (error) {
      console.error('Error al seleccionar la foto', error);
      return undefined;
    }
  }
}