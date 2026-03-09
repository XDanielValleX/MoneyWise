import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: false
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text'; // Puede ser 'text', 'number', etc.
  @Input() placeholder: string = '';
  @Input() icon?: string;
  @Input() control!: FormControl; // ¡Aquí recibe la magia reactiva de Angular!
}