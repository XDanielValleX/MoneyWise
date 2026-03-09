import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Transaccion } from '../../core/models/transaccion';
import { TransaccionService } from '../../core/services/transaccion.service'; // <-- Importamos el servicio

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit, OnDestroy {

  transacciones: Transaccion[] = [];

  textoBusqueda: string = '';
  filtroTipo: string = 'todos';
  filtroCategoria: string = 'todas';

  isModalOpen: boolean = false;
  private transaccionesSub!: Subscription; // Para manejar la suscripción

  constructor(
    private router: Router,
    private transaccionService: TransaccionService // <-- Lo inyectamos
  ) { }

  ngOnInit() {
    // Nos suscribimos a los datos reales
    this.transaccionesSub = this.transaccionService.transacciones$.subscribe(datos => {
      this.transacciones = datos;
    });
  }

  ngOnDestroy() {
    if (this.transaccionesSub) {
      this.transaccionesSub.unsubscribe();
    }
  }

  handleSearch(texto: string) {
    this.textoBusqueda = texto;
  }

  handleType(val: string) {
    this.filtroTipo = val;
  }

  handleCategory(val: string) {
    this.filtroCategoria = val;
  }

  verDetalleTransaccion(transaccion: Transaccion) {
    this.router.navigate(['/tabs/transacciones/detalle', transaccion.id]);
  }

  abrirModal() { this.isModalOpen = true; }
  cerrarModal() { this.isModalOpen = false; }

  async guardarNuevaTransaccion(datos: any) {
    // 1. Armamos el objeto de transacción con un ID único y la fecha actual
    const nuevaTransaccion: Transaccion = {
      id: Date.now().toString(), // Generamos un ID rápido basado en la fecha exacta
      fecha: new Date().toISOString(),
      tipo: datos.tipo,
      categoria: datos.categoria,
      monto: datos.monto,
      descripcion: datos.descripcion,
      comprobante: datos.comprobante // Si tu form manda foto, la guardamos
    };

    // 2. Lo enviamos al servicio para que lo guarde en el Storage
    await this.transaccionService.agregarTransaccion(nuevaTransaccion);

    console.log('¡Transacción guardada exitosamente!');
    this.cerrarModal();
  }
}