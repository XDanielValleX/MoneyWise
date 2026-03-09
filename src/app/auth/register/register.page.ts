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
    private authService: AuthService
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
      // 1. Extraemos el nombre, email y el password del formulario
      const { nombre, email, password } = this.registerForm.value;

      console.log('Registrando usuario...');

      // 2. Le pasamos exactamente los 3 argumentos que pide tu servicio
      const success = await this.authService.register(nombre, email, password);

      if (success) {
        console.log('¡Usuario registrado con éxito!');
        // 3. Como pediste, ahora lo mandamos al login para que inicie sesión manualmente
        this.router.navigate(['/auth/login']);
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