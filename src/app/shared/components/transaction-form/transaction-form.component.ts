import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular'; // <-- Importante
import { Transaccion } from '../../../core/models/transaccion';
import { CATEGORIAS } from '../../../core/constants/app.constants';
import { CameraService } from '../../../core/services/camera.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: false
})
export class TransactionFormComponent implements OnInit {
  @Input() transaccion?: Transaccion;
  @Output() onSave = new EventEmitter<Partial<Transaccion>>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;
  fotoTemporal?: string;
  categorias = CATEGORIAS.map(c => ({ value: c.nombre, text: c.nombre }));
  tipos = [{ value: 'ingreso', text: 'Ingreso' }, { value: 'gasto', text: 'Gasto' }];

  constructor(
    private fb: FormBuilder,
    private cameraService: CameraService,
    private modalCtrl: ModalController // <-- Inyectado
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      tipo: [this.transaccion?.tipo || 'gasto', Validators.required],
      monto: [this.transaccion?.monto || null, [Validators.required, Validators.min(1)]],
      categoria: [this.transaccion?.categoria || '', Validators.required],
      fecha: [this.transaccion?.fecha || new Date().toISOString(), Validators.required],
      descripcion: [this.transaccion?.descripcion || '']
    });
    this.fotoTemporal = this.transaccion?.comprobante;
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  async capturarFoto() {
    const foto = await this.cameraService.tomarFoto();
    if (foto) this.fotoTemporal = foto;
  }

  async buscarEnGaleria() {
    const foto = await this.cameraService.seleccionarDeGaleria();
    if (foto) this.fotoTemporal = foto;
  }

  borrarFoto() {
    this.fotoTemporal = undefined;
  }

  submit() {
    if (this.form.valid) {
      const data = { ...this.form.value, comprobante: this.fotoTemporal };
      this.onSave.emit(data);
      this.modalCtrl.dismiss(data); // <-- Cierra el modal y devuelve los datos
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.onCancel.emit();
    this.modalCtrl.dismiss(); // <-- Cierra el modal sin cambios
  }
}