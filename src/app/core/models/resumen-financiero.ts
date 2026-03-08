export interface ResumenFinanciero {
    saldoActual: number;
    totalGastosMes: number;
    totalIngresosMes: number;
    gastosPorCategoria: { [categoria: string]: number }; // Diccionario: { 'Alimentación': 1500, 'Salud': 500 }
}