import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amount-display',
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss'],
  standalone: false
})
export class AmountDisplayComponent {
  // Recibe estas propiedades (Props) desde afuera
  @Input() monto: number = 0;
  @Input() tipo: 'ingreso' | 'gasto' | 'neutral' = 'neutral';
  @Input() tamano: 'small' | 'medium' | 'large' = 'medium';

  // Define el color de Ionic basado en el tipo
  getColor(): string {
    if (this.tipo === 'ingreso') return 'success';
    if (this.tipo === 'gasto') return 'danger';
    return 'medium';
  }
}