import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  // Estado reactivo de las transacciones
  private transaccionesSubject = new BehaviorSubject<Transaccion[]>([]);
  public transacciones$ = this.transaccionesSubject.asObservable();

  private readonly STORAGE_KEY = 'mis_transacciones';

  constructor(private storage: StorageService) {
    this.cargarTransacciones();
  }

  // Leer (Read) - Carga inicial
  private async cargarTransacciones() {
    const transacciones = await this.storage.get(this.STORAGE_KEY) || [];
    this.transaccionesSubject.next(transacciones);
  }

  // Crear (Create)
  async agregarTransaccion(transaccion: Transaccion) {
    const actuales = this.transaccionesSubject.value;
    const nuevas = [transaccion, ...actuales]; // Se agrega al inicio de la lista

    await this.storage.set(this.STORAGE_KEY, nuevas);
    this.transaccionesSubject.next(nuevas); // Avisamos a la app del cambio
  }

  // Actualizar (Update)
  async actualizarTransaccion(transaccionActualizada: Transaccion) {
    const actuales = this.transaccionesSubject.value;
    const indice = actuales.findIndex(t => t.id === transaccionActualizada.id);

    if (indice !== -1) {
      actuales[indice] = transaccionActualizada;
      await this.storage.set(this.STORAGE_KEY, actuales);
      this.transaccionesSubject.next([...actuales]);
    }
  }

  // Eliminar (Delete)
  async eliminarTransaccion(id: string) {
    const actuales = this.transaccionesSubject.value;
    const filtradas = actuales.filter(t => t.id !== id);

    await this.storage.set(this.STORAGE_KEY, filtradas);
    this.transaccionesSubject.next(filtradas);
  }
}