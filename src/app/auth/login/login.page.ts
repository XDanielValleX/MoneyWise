import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      // 1. Extraemos el email y password del formulario
      const { email, password } = this.loginForm.value;

      console.log('Intentando iniciar sesión...');

      // 2. Le pasamos los 2 argumentos exactos al servicio
      const success = await this.authService.login(email, password);

      if (success) {
        console.log('¡Login exitoso, bienvenido!');
        // 3. Redirigimos al dashboard si todo salió bien
        this.router.navigate(['/tabs/dashboard']);
      } else {
        console.error('Credenciales incorrectas');
        alert('Correo o contraseña incorrectos. Verifica tus datos.');
      }
    } else {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}