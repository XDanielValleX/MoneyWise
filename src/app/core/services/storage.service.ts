import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa la base de datos local
  async init() {
    if (this._storage != null) {
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar un dato (ej: set('usuario', datosDelUsuario))
  public async set(key: string, value: any) {
    await this.init();
    return this._storage?.set(key, value);
  }

  // Leer un dato (ej: get('usuario'))
  public async get(key: string) {
    await this.init();
    return this._storage?.get(key);
  }

  // Eliminar un dato específico
  public async remove(key: string) {
    await this.init();
    return this._storage?.remove(key);
  }

  // Limpiar toda la base de datos (útil para cuando el usuario cierra sesión)
  public async clear() {
    await this.init();
    return this._storage?.clear();
  }
}