import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaccion } from '../../core/models/transaccion';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit {

  transacciones: Transaccion[] = [];

  // Variables para los filtros (coinciden con tu FilterBar)
  textoBusqueda: string = '';
  filtroTipo: string = 'todos';
  filtroCategoria: string = 'todas';

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

  // Handlers para los @Outputs de tu FilterBarComponent
  handleSearch(texto: string) {
    this.textoBusqueda = texto; // Esto dispara el pipe searchByText automáticamente
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

  guardarNuevaTransaccion(datos: any) {
    console.log('Datos listos para el service:', datos);
    this.cerrarModal();
  }
}