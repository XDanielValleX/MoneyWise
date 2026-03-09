import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit {

  transacciones: any[] = [];
  textoBusqueda: string = '';
  tipoFiltro: string = 'todos'; // Puede ser 'todos', 'ingreso' o 'gasto'

  // Capturamos el modal del HTML para poder abrirlo/cerrarlo desde aquí
  @ViewChild('modal') modal!: IonModal;

  constructor() { }

  ngOnInit() {
    this.cargarTransacciones();
  }

  cargarTransacciones() {
    // Usamos más datos para probar bien el buscador
    this.transacciones = [
      { id: '1', tipo: 'gasto', categoria: 'Alimentación', monto: 45.50, fecha: new Date().toISOString(), descripcion: 'Compra en supermercado' },
      { id: '2', tipo: 'ingreso', categoria: 'Salario', monto: 1500.00, fecha: new Date().toISOString(), descripcion: 'Quincena' },
      { id: '3', tipo: 'gasto', categoria: 'Transporte', monto: 15.00, fecha: new Date().toISOString(), descripcion: 'Gasolina' },
      { id: '4', tipo: 'gasto', categoria: 'Ocio', monto: 50.00, fecha: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), descripcion: 'Cine' },
      { id: '5', tipo: 'ingreso', categoria: 'Ventas', monto: 200.00, fecha: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), descripcion: 'Venta de audífonos' }
    ];
  }

  // Este "getter" hace la magia de filtrar la lista en tiempo real
  get transaccionesFiltradas() {
    return this.transacciones.filter(t => {
      // Filtro por tipo (Segment)
      const coincideTipo = this.tipoFiltro === 'todos' || t.tipo === this.tipoFiltro;

      // Filtro por texto de búsqueda (Searchbar)
      const termino = this.textoBusqueda.toLowerCase();
      const coincideTexto = t.descripcion.toLowerCase().includes(termino) ||
        t.categoria.toLowerCase().includes(termino);

      return coincideTipo && coincideTexto;
    });
  }

  verDetalleTransaccion(transaccion: any) {
    console.log('Abriendo detalle de:', transaccion.descripcion);
    // Pronto: this.router.navigate(['/tabs/transacciones/detalle', transaccion.id]);
  }

  irANuevaTransaccion() {
    // En lugar de navegar, abrimos el modal
    this.modal.present();
  }

  limpiarFiltros() {
    this.textoBusqueda = '';
    this.tipoFiltro = 'todos';
  }

  // NUEVA FUNCIÓN: Recibe los datos del formulario y los guarda
  guardarTransaccion(nuevaTransaccion: any) {
    console.log('Datos recibidos del formulario:', nuevaTransaccion);

    // Le creamos un ID falso temporalmente
    const transaccionCompleta = {
      ...nuevaTransaccion,
      id: Math.random().toString(36).substr(2, 9)
    };

    // La agregamos de primera a la lista actual (.unshift la pone arriba del todo)
    this.transacciones.unshift(transaccionCompleta);

    // Cerramos el modal automáticamente
    this.modal.dismiss();
  }
}