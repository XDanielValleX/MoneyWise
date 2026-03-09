import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  userName: string = 'Daniel';
  totalBalance: number = 2540.50;
  totalIncome: number = 3200.00;
  totalExpense: number = 659.50;

  gastosPorCategoria: any[] = [];
  recentTransactions: any[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Datos para las barras de progreso
    this.gastosPorCategoria = [
      { nombre: 'Alimentación', total: 300, porcentaje: 0.6 },
      { nombre: 'Transporte', total: 150, porcentaje: 0.3 },
      { nombre: 'Ocio', total: 50, porcentaje: 0.1 }
    ];

    // Datos simulando el modelo Transaccion
    this.recentTransactions = [
      {
        id: '1',
        tipo: 'gasto',
        categoria: 'Alimentación',
        monto: 45.50,
        fecha: new Date().toISOString(),
        descripcion: 'Compra en supermercado'
      },
      {
        id: '2',
        tipo: 'ingreso',
        categoria: 'Salario',
        monto: 1500.00,
        fecha: new Date().toISOString(),
        descripcion: 'Quincena'
      },
      {
        id: '3',
        tipo: 'gasto',
        categoria: 'Transporte',
        monto: 15.00,
        fecha: new Date().toISOString(),
        descripcion: 'Gasolina',
        comprobante: 'https://via.placeholder.com/150' // Prueba del badge/imagen
      }
    ];
  }

  // Se ejecuta cuando haces clic en una transacción
  verDetalleTransaccion(transaccion: any) {
    console.log('Ver detalle de:', transaccion);
    // Más adelante aquí pondremos la navegación al detalle
  }

  // Se ejecuta cuando haces clic en el botón del empty state
  irANuevaTransaccion() {
    console.log('Navegando a crear transacción...');
    // Aquí podemos redirigir al formulario de nueva transacción
  }
}