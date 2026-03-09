import { Component, EventEmitter, Output } from '@angular/core';
import { CameraService } from '../../../core/services/camera.service';

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
  standalone: false
})
export class PhotoSelectorComponent {
  // Emite la foto en formato base64 hacia el formulario
  @Output() photoSelected = new EventEmitter<string>();

  constructor(private cameraService: CameraService) { }

  async takePhoto() {
    const photo = await this.cameraService.tomarFoto();
    if (photo) {
      this.photoSelected.emit(photo);
    }
  }

  async chooseFromGallery() {
    const photo = await this.cameraService.seleccionarDeGaleria();
    if (photo) {
      this.photoSelected.emit(photo);
    }
  }
}