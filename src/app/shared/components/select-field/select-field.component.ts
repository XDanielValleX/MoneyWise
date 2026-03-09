import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  standalone: false
})
export class SelectFieldComponent {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() control!: FormControl;
  @Input() options: { value: any, text: string }[] = []; // Lista de opciones a mostrar
}