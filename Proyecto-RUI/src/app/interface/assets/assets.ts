import { Employee } from "../employees/employee";

export interface Assets {
    id:number;
    codigo:string;
    nombre:string;
    descripcion:string;
    createAt: Date;
    deletedAt: Date;
    fechaAsignacion: string;
    vidaUtil: number;
    employee: Employee; // Aquí agregamos el empleado
}