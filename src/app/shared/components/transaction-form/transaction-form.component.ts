import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Transaccion } from '../../../core/models/transaccion';
import { CATEGORIAS } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: false
})
export class TransactionFormComponent implements OnInit {
  @Input() transaccion?: Transaccion; // Si pasamos una transacción, es para "Editar"

  @Output() onSave = new EventEmitter<Partial<Transaccion>>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;
  fotoTemporal?: string;

  // Transformamos nuestras categorías constantes al formato que pide nuestro SelectField
  categorias = CATEGORIAS.map(c => ({ value: c.nombre, text: c.nombre }));
  tipos = [
    { value: 'ingreso', text: 'Ingreso' },
    { value: 'gasto', text: 'Gasto' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Inicializamos el formulario reactivo
    this.form = this.fb.group({
      tipo: [this.transaccion?.tipo || 'gasto', Validators.required],
      monto: [this.transaccion?.monto || null, [Validators.required, Validators.min(1)]],
      categoria: [this.transaccion?.categoria || '', Validators.required],
      fecha: [this.transaccion?.fecha || new Date().toISOString(), Validators.required],
      descripcion: [this.transaccion?.descripcion || '']
    });

    this.fotoTemporal = this.transaccion?.comprobante;
  }

  // Ayudante para pasar el controlador correcto a nuestro HTML
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  setFoto(foto: string) {
    this.fotoTemporal = foto;
  }

  borrarFoto() {
    this.fotoTemporal = undefined;
  }

  submit() {
    if (this.form.valid) {
      this.onSave.emit({
        ...this.form.value,
        comprobante: this.fotoTemporal
      });
    } else {
      // Si hay error, marcamos todo como "tocado" para que salgan los textos rojos
      this.form.markAllAsTouched();
    }
  }
}