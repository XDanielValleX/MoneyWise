import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: false
})
export class DashboardCardComponent {
  @Input() titulo: string = '';
  @Input() monto: number = 0;
  @Input() icono: string = 'wallet';
  @Input() tipo: 'ingreso' | 'gasto' | 'neutral' = 'neutral';
  @Input() colorTema: string = 'primary'; // Para pintar el ícono
}