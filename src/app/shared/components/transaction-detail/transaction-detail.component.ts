import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone: false
})
export class TransactionDetailComponent {
  @Input() transaccion!: Transaccion;

  // Eventos para avisar al padre qué botón se presionó
  @Output() onClose = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<Transaccion>();
  @Output() onDelete = new EventEmitter<string>(); // Pasamos el ID para borrar
}