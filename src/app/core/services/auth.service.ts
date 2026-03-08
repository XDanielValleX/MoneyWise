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
      const user: User = { id: Date.now().toString(), email };
      await this.storage.set('currentUser', user); // Persistencia
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  // RF-1: Autenticación Simulada (Registro)
  async register(email: string, password: string): Promise<boolean> {
    if (email && password) {
      const user: User = { id: Date.now().toString(), email, password };
      await this.storage.set('currentUser', user); // Persistencia local
      this.currentUserSubject.next({ id: user.id, email: user.email });
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