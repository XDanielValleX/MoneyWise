import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Transaccion } from '../../core/models/transaccion';

@Component({
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
  standalone: false
})
export class DetalleTransaccionPage implements OnInit {
  transaccion?: Transaccion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDatos(id);
    }
  }

  cargarDatos(id: string) {
    // MOCK: Datos temporales mientras creamos el TransaccionService
    const mock: Transaccion[] = [
      { id: '1', tipo: 'gasto', categoria: 'Alimentación', monto: 45.50, fecha: new Date().toISOString(), descripcion: 'Cena familiar', comprobante: 'assets/recibo.jpg' },
      { id: '2', tipo: 'ingreso', categoria: 'Salario', monto: 1500.00, fecha: new Date().toISOString(), descripcion: 'Pago quincenal' }
    ];
    this.transaccion = mock.find(t => t.id === id);
  }

  // Manejador para el botón "Cerrar" de tu componente
  regresar() {
    this.navCtrl.back();
  }

  // Manejador para el evento onEdit
  abrirEdicion(t: Transaccion) {
    console.log('Navegando a edición de:', t.id);
    // Próximo paso: Lógica para abrir modal o página de edición
  }

  // Manejador para el evento onDelete (Punto 8: ion-alert)
  async confirmarEliminacion(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          cssClass: 'delete-button',
          handler: () => {
            console.log('Eliminando:', id);
            this.regresar();
          }
        }
      ]
    });
    await alert.present();
  }
}