import { Assets } from "../assets/assets";

export interface Employee {
    id:number;
    cedula:number;
    nombre:string;
    apellido:string;
    correo:string;
    createAt: Date;
    deleteAt: Date;
    assets: Assets;
}