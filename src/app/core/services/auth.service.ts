import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Aquí cumplimos el requisito 7: "Gestión de Estado: BehaviorSubject"
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private storage: StorageService, private router: Router) {
    this.loadUser();
  }

  // Carga el usuario desde la base de datos al abrir la app
  private async loadUser() {
    const user = await this.storage.get('currentUser');
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  // RF-1: Autenticación Simulada (Login)
  async login(email: string, password: string): Promise<boolean> {
    if (email && password) {
      // 1. Ahora traemos la LISTA completa de usuarios ('registeredUsers' en plural)
      // Si no hay nada guardado aún, iniciamos con un arreglo vacío []
      const users = await this.storage.get('registeredUsers') || [];

      // 2. Buscamos en la lista si hay algún usuario con ese correo y contraseña
      const savedUser = users.find((u: User) => u.email === email && u.password === password);

      if (savedUser) {
        // ¡Login exitoso! Lo guardamos como el usuario activo
        await this.storage.set('currentUser', savedUser);
        this.currentUserSubject.next(savedUser);
        return true;
      }
    }
    return false;
  }

  // RF-1: Autenticación Simulada (Registro)
  async register(nombre: string, email: string, password: string): Promise<boolean> {
    if (nombre && email && password) {
      const user = { id: Date.now().toString(), nombre, email, password };

      // 1. Traemos la lista de todos los usuarios registrados
      const users = await this.storage.get('registeredUsers') || [];

      // (Opcional pero genial) Evitamos que se registren 2 correos iguales
      const emailExiste = users.find((u: User) => u.email === email);
      if (emailExiste) {
        console.error('Este correo ya está registrado');
        return false;
      }

      // 2. Metemos al nuevo usuario en la lista
      users.push(user);

      // 3. Guardamos la LISTA completa de nuevo en el storage
      await this.storage.set('registeredUsers', users);

      return true;
    }
    return false;
  }

  // Flujo 6: Cierre de Sesión
  async logout() {
    await this.storage.remove('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  // Para saber si el usuario está logueado en este instante
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}