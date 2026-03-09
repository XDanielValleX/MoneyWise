import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // <-- Inyectamos el servicio
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      // 1. Extraemos el email y el password del formulario
      const { email, password } = this.registerForm.value;

      console.log('Registrando usuario...');

      // 2. Le pasamos exactamente los 2 argumentos que pide tu servicio
      const success = await this.authService.register(email, password);

      if (success) {
        console.log('¡Usuario registrado y logueado con éxito!');
        // 3. Como el registro fue exitoso, lo mandamos al dashboard
        this.router.navigate(['/tabs/dashboard']);
      }
    } else {
      console.log('Formulario de registro inválido');
      this.registerForm.markAllAsTouched();
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}