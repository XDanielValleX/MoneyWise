import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  standalone: false
})
export class DateFieldComponent {
  @Input() label: string = 'Fecha';
  @Input() icon: string = 'calendar';
  @Input() control!: FormControl;
}