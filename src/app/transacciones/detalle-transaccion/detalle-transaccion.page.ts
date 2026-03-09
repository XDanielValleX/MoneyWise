import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Transaccion } from '../../core/models/transaccion';
import { TransaccionService } from '../../core/services/transaccion.service';
import { TransactionFormComponent } from '../../shared/components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
  standalone: false
})
export class DetalleTransaccionPage implements OnInit, OnDestroy {
  transaccion?: Transaccion;
  private transaccionSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private modalCtrl: ModalController, // <-- Inyectado
    private transaccionService: TransaccionService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDatos(id);
    }
  }

  ngOnDestroy() {
    if (this.transaccionSub) {
      this.transaccionSub.unsubscribe();
    }
  }

  cargarDatos(id: string) {
    this.transaccionSub = this.transaccionService.transacciones$.subscribe(transacciones => {
      this.transaccion = transacciones.find(t => t.id === id);
    });
  }

  regresar() {
    this.navCtrl.back();
  }

  // LÓGICA DE EDICIÓN USANDO MODALCONTROLLER
  async abrirEdicion(t: Transaccion) {
    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent,
      componentProps: {
        transaccion: t // Pasamos la transacción al formulario
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      // Combinamos los datos nuevos manteniendo el ID original
      const transaccionEditada: Transaccion = {
        ...t,
        ...data
      };
      await this.transaccionService.actualizarTransaccion(transaccionEditada);
    }
  }

  async confirmarEliminacion(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.transaccionService.eliminarTransaccion(id);
            this.regresar();
          }
        }
      ]
    });
    await alert.present();
  }
}