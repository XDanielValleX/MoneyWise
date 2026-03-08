export interface Transaccion {
    id: string;
    tipo: 'ingreso' | 'gasto';
    categoria: string;
    fecha: string; // Usaremos formato ISO string para que sea fácil de guardar
    monto: number;
    descripcion?: string;
    comprobante?: string; // Aquí guardaremos la ruta o base64 de la foto
}