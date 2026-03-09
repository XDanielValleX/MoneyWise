import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false
})
export class TransactionItemComponent {
  // Recibe la transacción completa con todos sus datos
  @Input() transaccion!: Transaccion;

  // Avisa al componente padre cuando el usuario hace clic en esta fila
  @Output() onClick = new EventEmitter<Transaccion>();

  handleClick() {
    this.onClick.emit(this.transaccion);
  }
}