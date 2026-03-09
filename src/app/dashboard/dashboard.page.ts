import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Importamos tus servicios
import { AuthService } from '../core/services/auth.service';
import { TransaccionService } from '../core/services/transaccion.service';
import { StorageService } from '../core/services/storage.service';

// ¡Importamos tus Modelos!
import { Transaccion } from '../core/models/transaccion';
import { User } from '../core/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit, OnDestroy {

  userName: string = 'Usuario';
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;

  gastosPorCategoria: any[] = [];
  recentTransactions: Transaccion[] = [];

  private transaccionesSub!: Subscription;

  constructor(
    private authService: AuthService,
    private transaccionService: TransaccionService,
    private storageService: StorageService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.cargarUsuario();
    this.suscribirseATransacciones();
  }

  ngOnDestroy() {
    if (this.transaccionesSub) {
      this.transaccionesSub.unsubscribe();
    }
  }

  async cargarUsuario() {
    // Usamos tu interfaz User estricta
    const user: User = await this.storageService.get('currentUser');

    if (user) {
      // Si el usuario tiene nombre (que ya lo configuramos en el registro), lo usamos.
      // Si por alguna razón no lo tiene, hacemos el respaldo de cortar el email.
      if (user.nombre) {
        this.userName = user.nombre;
      } else if (user.email) {
        this.userName = user.email.split('@')[0];
        this.userName = this.userName.charAt(0).toUpperCase() + this.userName.slice(1);
      }
    }
  }

  suscribirseATransacciones() {
    this.transaccionesSub = this.transaccionService.transacciones$.subscribe((transacciones: Transaccion[]) => {
      this.totalIncome = this.transaccionService.totalIngresos;
      this.totalExpense = this.transaccionService.totalGastos;
      this.totalBalance = this.transaccionService.saldoActual;
      this.gastosPorCategoria = this.transaccionService.getGastosPorCategoria();

      this.recentTransactions = transacciones.slice(0, 5);
    });
  }

  verDetalleTransaccion(transaccion: Transaccion) {
    this.router.navigate(['/tabs/transacciones/detalle', transaccion.id]);
  }

  // dashboard.page.ts
  irANuevaTransaccion() {
    // Te lleva a la pestaña de la lista de movimientos
    this.router.navigate(['/tabs/transacciones']);
  }

  cerrarSesion() {
    this.authService.logout();
  }
}