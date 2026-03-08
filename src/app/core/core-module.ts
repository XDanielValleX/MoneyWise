import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule.forRoot() // Configurar la base de datos
  ]
})
export class CoreModule {
  // Evita que alguien importe el CoreModule en otro lado que no sea el AppModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya ha sido cargado. Importalo solo en el AppModule.');
    }
  }
}