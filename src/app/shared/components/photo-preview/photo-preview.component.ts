import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoGalleryModalComponent } from '../photo-gallery-modal/photo-gallery-modal.component';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
  standalone: false
})
export class PhotoPreviewComponent {
  @Input() photoUrl!: string;
  @Output() onRemove = new EventEmitter<void>();

  constructor(private modalCtrl: ModalController) { }

  removePhoto() {
    this.onRemove.emit();
  }

  // Abre el componente Modal que creamos en el paso anterior
  async viewPhoto() {
    const modal = await this.modalCtrl.create({
      component: PhotoGalleryModalComponent,
      componentProps: { photoUrl: this.photoUrl }
    });
    await modal.present();
  }
}