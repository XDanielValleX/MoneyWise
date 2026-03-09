import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Transaccion } from '../models/transaccion';
import { AuthService } from './auth.service'; // <-- Importamos el AuthService

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  // Estado reactivo de las transacciones
  private transaccionesSubject = new BehaviorSubject<Transaccion[]>([]);
  public transacciones$ = this.transaccionesSubject.asObservable();

  // Llave dinámica (ya no es const ni estática)
  private currentStorageKey = '';

  constructor(
    private storage: StorageService,
    private authService: AuthService // <-- Lo inyectamos aquí
  ) {
    // Escuchamos los cambios de sesión de usuario en tiempo real
    this.authService.currentUser$.subscribe(user => {
      if (user && user.id) {
        // Si alguien inicia sesión, amarramos la llave a su ID
        this.currentStorageKey = `transacciones_${user.id}`;
        this.cargarTransacciones(); // Cargamos SUS transacciones
      } else {
        // Si cierra sesión, limpiamos la llave y borramos la memoria RAM de la app
        this.currentStorageKey = '';
        this.transaccionesSubject.next([]);
      }
    });
  }

  // Leer (Read) - Carga inicial
  private async cargarTransacciones() {
    if (!this.currentStorageKey) return; // Seguridad extra
    const transacciones = await this.storage.get(this.currentStorageKey) || [];
    this.transaccionesSubject.next(transacciones);
  }

  // Crear (Create)
  async agregarTransaccion(transaccion: Transaccion) {
    if (!this.currentStorageKey) return;
    const actuales = this.transaccionesSubject.value;
    const nuevas = [transaccion, ...actuales]; // Se agrega al inicio de la lista

    await this.storage.set(this.currentStorageKey, nuevas);
    this.transaccionesSubject.next(nuevas); // Avisamos a la app del cambio
  }

  // Actualizar (Update)
  async actualizarTransaccion(transaccionActualizada: Transaccion) {
    if (!this.currentStorageKey) return;
    const actuales = this.transaccionesSubject.value;
    const indice = actuales.findIndex(t => t.id === transaccionActualizada.id);

    if (indice !== -1) {
      actuales[indice] = transaccionActualizada;
      await this.storage.set(this.currentStorageKey, actuales);
      this.transaccionesSubject.next([...actuales]);
    }
  }

  // Eliminar (Delete)
  async eliminarTransaccion(id: string) {
    if (!this.currentStorageKey) return;
    const actuales = this.transaccionesSubject.value;
    const filtradas = actuales.filter(t => t.id !== id);

    await this.storage.set(this.currentStorageKey, filtradas);
    this.transaccionesSubject.next(filtradas);
  }

  // 1. Obtener el total de ingresos
  get totalIngresos(): number {
    return this.transaccionesSubject.value
      .filter(t => t.tipo === 'ingreso')
      .reduce((acc, t) => acc + t.monto, 0);
  }

  // 2. Obtener el total de gastos
  get totalGastos(): number {
    return this.transaccionesSubject.value
      .filter(t => t.tipo === 'gasto')
      .reduce((acc, t) => acc + t.monto, 0);
  }

  // 3. Obtener el saldo actual
  get saldoActual(): number {
    return this.totalIngresos - this.totalGastos;
  }

  // 4. Agrupar gastos por categoría y sacar el porcentaje
  getGastosPorCategoria() {
    const gastos = this.transaccionesSubject.value.filter(t => t.tipo === 'gasto');
    const totalGastos = this.totalGastos;

    if (totalGastos === 0) return []; // Si no hay gastos, devolvemos un array vacío

    // Sumamos los montos por cada categoría
    const agrupados = gastos.reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + t.monto;
      return acc;
    }, {} as { [key: string]: number });

    // Lo convertimos en el formato que necesitan tus barras de progreso
    return Object.keys(agrupados).map(categoria => ({
      nombre: categoria,
      total: agrupados[categoria],
      porcentaje: agrupados[categoria] / totalGastos
    })).sort((a, b) => b.total - a.total); // Ordenamos del gasto mayor al menor
  }
}