import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { ListaTransaccionesPageRoutingModule } from './lista-transacciones-routing.module';
import { ListaTransaccionesPage } from './lista-transacciones.page';
import { SharedModule } from '../../shared/shared-module'; // <-- Tu módulo

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, //
    ListaTransaccionesPageRoutingModule,
    SharedModule, //
  ],
  declarations: [ListaTransaccionesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListaTransaccionesPageModule { }