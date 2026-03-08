import { Categoria } from '../models/categoria';

export const TIPOS_TRANSACCION = ['ingreso', 'gasto'];

// Colores e íconos predefinidos de Ionic (IonIcons)
export const CATEGORIAS: Categoria[] = [
    { id: '1', nombre: 'Alimentación', icono: 'restaurant', color: 'warning' },
    { id: '2', nombre: 'Transporte', icono: 'bus', color: 'tertiary' },
    { id: '3', nombre: 'Vivienda', icono: 'home', color: 'primary' },
    { id: '4', nombre: 'Salud', icono: 'medkit', color: 'danger' },
    { id: '5', nombre: 'Ocio', icono: 'game-controller', color: 'secondary' },
    { id: '6', nombre: 'Salario', icono: 'cash', color: 'success' },
    { id: '7', nombre: 'Otros', icono: 'ellipsis-horizontal-circle', color: 'medium' }
];