export interface User {
    id: string;
    email: string;
    password?: string; // Opcional porque a veces no viaja al frontend
}