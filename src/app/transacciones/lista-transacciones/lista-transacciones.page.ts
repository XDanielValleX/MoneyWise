import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false // <-- ¡Esto es súper importante!
})
export class ListaTransaccionesPage implements OnInit {

  // Estas son las variables que el HTML está pidiendo a gritos y no encuentra
  transacciones: any[] = [];
  filtroActual: string = 'todos';
  textoBusqueda: string = '';
  isModalOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.cargarDatosPrueba();
  }

  cargarDatosPrueba() {
    this.transacciones = [
      { id: '1', tipo: 'gasto', categoria: 'Alimentación', monto: 45.50, fecha: new Date().toISOString(), descripcion: 'Supermercado' },
      { id: '2', tipo: 'ingreso', categoria: 'Salario', monto: 1500.00, fecha: new Date().toISOString(), descripcion: 'Pago Quincena' }
    ];
  }

  alCambiarFiltro(nuevoFiltro: string) {
    this.filtroActual = nuevoFiltro;
  }

  verDetalleTransaccion(transaccion: any) {
    this.router.navigate(['/tabs/transacciones/detalle', transaccion.id]);
  }

  // Funciones del Modal que el HTML no encontraba
  abrirModal() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  guardarNuevaTransaccion(datos: any) {
    console.log('Guardando...', datos);
    this.cerrarModal();
  }
}