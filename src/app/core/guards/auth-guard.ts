import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    // 1. Revisa si ya está en memoria rápida
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // 2. Revisa la base de datos local (espera un momento)
    const user = await this.storageService.get('currentUser');
    if (user) {
      return true;
    }

    // 3. Si no hay nada, lo manda al login
    this.router.navigate(['/auth/login']);
    return false;
  }
}