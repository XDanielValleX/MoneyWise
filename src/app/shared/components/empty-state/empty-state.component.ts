import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false
})
export class EmptyStateComponent {
  @Input() mensaje: string = 'No hay datos para mostrar';
  @Input() icono: string = 'folder-open-outline';
  @Input() accion: string = ''; // Texto del botón (opcional)

  // Emite un evento cuando se hace clic en el botón
  @Output() onAccion = new EventEmitter<void>();

  ejecutarAccion() {
    this.onAccion.emit();
  }
}